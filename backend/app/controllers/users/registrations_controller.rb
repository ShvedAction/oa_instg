# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]
  respond_to :json

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    p "here"
    devise_parameter_sanitizer.permit(:sign_up, keys: [:last_name, :first_name])
  end

end
