class CommentsController < ApplicationController
  before_action :set_comment, only: [:show,  :destroy]
  before_action :set_post
  before_action :authenticate_user!

  # GET /posts/:post_id/comments
  # GET /posts/:post_id/comments.json
  def index
    @comments = @post.comments.includes(:user)
  end

  # GET /posts/:post_id/comments/new
  def new
    @post = Post.find params[:post_id]
    @comment = Comment.new(post: @post, user: current_user)
  end

  # POST /posts/:post_id/comments
  # POST /posts/:post_id/comments.json
  def create
    post = Post.find params[:post_id]
    proto = {
      user: current_user,
      post: post,
      body: comment_params[:body]
    }
    @comment = Comment.new(proto)

    respond_to do |format|
      if @comment.save
        format.html { redirect_to post_comments_url(post), notice: 'Comment was successfully created.' }
        format.json { render :show, status: :created, location: [post, @comment] }
      else
        format.html { render :new }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/:post_id/comments/:id
  # DELETE /posts/:post_id/comments/:id.json
  def destroy
    if @comment.user_id != current_user.id
      respond_to do |format|
        format.html { redirect_to post_comments_url(@comment.post), notice: 'Forbidden' }
        format.json { render json: {}, status: :forbidden }
      end
      return
    end
    @comment.destroy
    post = Post.find params[:post_id]
    respond_to do |format|
      format.html { redirect_to post_comments_url(post), notice: 'Comment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def set_post
      @post = Post.find(params[:post_id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:user_id, :post_id, :body)
    end
end
