require 'test_helper'

class LinksControllerTest < ActionController::TestCase

  test "should create an link" do
    link = {title: "What up", url: "https://github.com/mcschatz"}

    assert_equal 3, Link.count

    post :create, format: :json, link: link
    link = JSON.parse(response.body, symbolize_names: true)

    assert_equal "What up", link[:title]
    assert_equal 4, Link.count
  end
end
