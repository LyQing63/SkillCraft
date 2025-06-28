# 数据库设计规范

## 1. 总则

本文档旨在为项目的数据库设计提供统一的规范和指导原则，确保数据的一致性、可扩展性和可维护性。

## 2. 关系完整性约束

### 2.1. 外键策略：采用逻辑外键

**规范描述：**

在本项目的所有数据库表设计中，统一采用 **逻辑外键** 来维护表与表之间的关联关系，**禁止使用** 数据库层面的 **物理外键**（即 `FOREIGN KEY` 约束）。

**定义与解释：**

- **物理外键 (Physical Foreign Key):** 由数据库管理系统（DBMS）强制执行的引用完整性约束。当对关联表进行插入、更新或删除操作时，数据库会检查该操作是否违反外键约束，如果违反则拒绝执行。
- **逻辑外键 (Logical Foreign Key):** 不在数据库层面创建 `FOREIGN KEY` 约束，而是通过应用程序的业务逻辑来保证数据之间的引用完整性。具体来说，一个表中的某个字段（例如 `user_id`）虽然引用了另一个表的主键，但我们只在字段命名和注释上体现这种关联，而不添加实际的数据库约束。

**采用逻辑外键的理由：**

1.  **提升性能：** 物理外键会在每次写操作（INSERT, UPDATE, DELETE）时进行检查，在高并发场景下可能成为性能瓶颈。逻辑外键将验证逻辑转移到应用层，可以更灵活地控制。
2.  **简化数据库迁移与分片：** 在分布式数据库架构或进行数据库分片时，物理外键会带来巨大的复杂性，甚至无法实现。逻辑外键使得数据库结构更加独立和松耦合，便于水平扩展。
3.  **提高开发灵活性：** 在开发和测试阶段，可以更方便地处理数据，而无需严格遵守外键依赖顺序，简化了数据初始化的过程。

**风险与对策：**

- **数据不一致风险：** 最大的风险是可能产生“孤儿数据”（例如，删除了用户，但该用户的订单记录依然存在）。
- **对策：** 必须在 **应用层代码** 中严格实现数据完整性的检查和维护逻辑。例如，在删除一个用户时，必须在业务代码中先检查并处理该用户的所有关联数据（如订单、日志等），或者通过事务来保证操作的原子性。

### 2.2. 示例

假设我们有 `users` 表和 `learning_plans` 表，一个用户可以有多个学习计划。

**`users` 表结构:**

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**`learning_plans` 表结构 (采用逻辑外键):**

```sql
CREATE TABLE learning_plans (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL, -- 逻辑外键，引用 users(id)
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- 没有 FOREIGN KEY (user_id) REFERENCES users(id) 约束
);
```

**应用层保证数据一致性的伪代码:**

```go
// function to delete a user
func DeleteUser(userId int64) error {
    // 开启数据库事务
    tx, err := db.Begin()
    if err != nil {
        return err
    }

    // 1. 删除该用户的所有学习计划
    _, err = tx.Exec("DELETE FROM learning_plans WHERE user_id = ?", userId)
    if err != nil {
        tx.Rollback() // 出错则回滚
        return err
    }

    // 2. 删除用户本身
    _, err = tx.Exec("DELETE FROM users WHERE id = ?", userId)
    if err != nil {
        tx.Rollback() // 出错则回滚
        return err
    }

    // 提交事务
    return tx.Commit()
}
```

通过上述伪代码中的事务处理，我们确保了在删除用户之前，其所有关联的学习计划也被一并删除，从而在应用层维护了数据的完整性。