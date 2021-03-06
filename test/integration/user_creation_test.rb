require 'test_helper'

class UserCreationTest < ActionDispatch::IntegrationTest

  test 'a user can be created' do
    visit root_path
    click_link "Sign Up"
    assert_current_path(new_user_path)

    fill_in "Email", with: "mimi@gmail.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_button "Create Account"

    assert page.has_content?("Welcome")
  end
end