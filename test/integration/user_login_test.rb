require 'test_helper'

class UserLoginTest < ActionDispatch::IntegrationTest

  test "registered user can login" do
    user = User.create(email: "rachel@gmail.com", password: "password", password_confirmation: "password")

    visit login_path
    fill_in "Email", with: user.email
    fill_in "Password", with: "password"
    click_button "Login"

    assert page.has_content?("Welcome")
  end

end