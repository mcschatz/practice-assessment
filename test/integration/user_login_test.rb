require 'test_helper'

class UserLoginTest < ActionDispatch::IntegrationTest

  test "registered user can login" do
    user = User.create(username: "rachel", password: "password", password_confirmation: "password")

    visit login_path
    fill_in "Username", with: user.username
    fill_in "Password", with: "password"
    click_button "Login"

    assert page.has_content?("Welcome, Rachel")
  end
end