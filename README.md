## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false, foreign_key: true|

### Association
- has_many :chats
- has_many :groups
- has_many :groups_users

## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text||
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- has_many :groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|
|image|text|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :chats
- has_many :users
- has_many :gourps_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
- has_many :users, through: :groups_users

