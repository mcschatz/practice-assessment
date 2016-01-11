require 'test_helper'

class UserCanCreateALinkTest < ActionDispatch::IntegrationTest

  test 'a user can create a link' do
    user = User.create(email: "rachel@gmail.com", password: "password", password_confirmation: "password")
    visit login_path

    fill_in "Email", with: user.email
    fill_in "Password", with: "password"
    click_button "Login"

    assert_current_path(links_path)

    fill_in "Title", with: "Winner"
    fill_in "Url", with: "http://www.panicstream.com/vault/today-in-widespread-panic-history/"

    click_button "Create Link"

    assert page.has_content?("Winner")
  end
end