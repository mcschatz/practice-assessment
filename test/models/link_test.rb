require 'test_helper'

class LinkTest < ActiveSupport::TestCase
  attr_reader :link, :secondlink

  def setup
    super
    @link       = Link.create(title: "Great Idea!", url: "http://www.nytimes.com/", user_id: 1)
    @secondlink = Link.create(title: "Great Idea!", url: "http://www.nytimes.com/", user_id: 1)
  end

  test "a link has a title" do
    assert_equal "Great Idea!", link.title
  end

  test "a link has an url" do
    assert_equal "http://www.nytimes.com/", link.url
  end

  test "a link has a default read_status" do
    assert_equal false, link.read_status
  end

  test "a link has a user_id" do
    assert_equal 1, link.user_id
  end
end