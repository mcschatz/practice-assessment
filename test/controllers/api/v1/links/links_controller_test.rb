require 'test_helper'

class Api::V1::Links::LinksControllerTest < ActionController::TestCase

  def teardown
    Capybara.reset_sessions!
  end

  test "#links" do
    get :index, format: :json, link_id: Link.last.id
    links = JSON.parse(response.body, symbolize_names: true)
    link = links.first

    assert_response :success
    assert_equal "First One", link[:title]
  end

  test "should update an link" do
    linkParams = {title: "New one", url: "http://stackoverflow.com/questions/22187127/test-helper-method-with-minitest"}
    link = Link.first

    assert_equal "Third One", link.title

    put :update, format: :json, id: Link.first.id, link: linkParams
    link = JSON.parse(response.body, symbolize_names: true)
    assert_equal "New one", link[:title]
  end
end