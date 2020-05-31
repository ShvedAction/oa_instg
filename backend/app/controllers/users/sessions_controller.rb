
class Users::SessionsController < Devise::SessionsController

  def current
    authenticate_user!
    if current_user
      render json: current_user
    else
      render json: {body: "no auth"}, status: :unauthorized
    end
  end

  protected
  def after_sign_in_path_for(resource)
    "/api/users/sessions.json"
  end

  def auth_options
    { :scope => resource_name, :recall => "users/sessions#current" }
  end
end
