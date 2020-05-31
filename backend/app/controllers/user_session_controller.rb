class UserSessionController < ApplicationController
  before_action :authenticate_user!

  # GET user_session/current
  def current
    render json: current_user
  end
end
