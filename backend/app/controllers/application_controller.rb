class ApplicationController < ActionController::Base
  skip_forgery_protection
  protected
  def after_sign_in_path_for(resource)
    p "here i aftsg"
    "/api/users/sessions.json"
  end

  def after_sign_out_path_for(resource)
    p "here i aft gf"
    "/api/users/sessions.json"
  end
end
