class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_many :likes
  has_many :appreciators, through: :likes, source: :user

  scope :feed,  -> {
    includes(:user).includes(:comments).order(created_at: :desc)
  }

  def likes_count
    self.likes.count
  end

  def liked? user_id
    self.likes.where(user_id: user_id).count > 0
  end
end