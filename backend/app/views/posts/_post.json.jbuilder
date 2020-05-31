json.extract! post, :id, :user_id, :src
json.createdAt post.created_at
json.author post.user.email
json.likedPost post.liked?(@user)
json.likesCount post.likes.count
# json.array! post.comments, partial: "comments/comment", as: :comment
json.comments post.comments do |comment|
  json.body comment.body
  json.author comment.user.email
  json.createdAt comment.created_at
end