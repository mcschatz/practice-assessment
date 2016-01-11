require 'test_helper'

class UserCreationTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  test 'a user can be created' do
    vist root_path
    fill_in "Username", with: "mimi"
    fill_in "Password", with: "password"
    click_button "Create Account"

    assert page.has_content?("Welcome, Mimi")
  end
end