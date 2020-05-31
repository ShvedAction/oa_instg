class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all.includes(:user).joins(:comments)
    @user = current_user
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # POST /posts/:post_id/like_it
  def like_it
    @post = Post.find(params[:post_id])
    like = @post.likes.new(user: current_user)
    respond_to do |format|
      if like.save
        format.html { redirect_to @post, notice: 'Like was successfully created.' }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new }
        format.json { render json: like.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /posts/:post_id/dislike_it
  def dislike_it
    @post = Post.find(params[:post_id])
    respond_to do |format|
      if Like.where(user: current_user, post: @post).delete_all
        format.html { redirect_to @post, notice: 'Like was successfully deleted.' }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new }
        format.json { render json: "unknown error", status: :unprocessable_entity }
      end
    end
  end

  # POST /posts
  # POST /posts.json
  def create
    
    uploaded_io = params[:post][:src]

    file_path = Uploader.upload(uploaded_io)

    @post = Post.new(user: current_user, src: file_path)

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end


  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    if @post.user_id != current_user.id
      respond_to do |format|
        format.html { redirect_to posts_url, notice: 'Forbidden' }
        format.json { render json: {}, status: :forbidden }
      end
      return
    end
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:user_id, :src)
    end
end