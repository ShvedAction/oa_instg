require 'test_helper'

class UserSessionControllerTest < ActionDispatch::IntegrationTest
  test "should get current" do
    get user_session_current_url
    assert_response :success
  end

end
