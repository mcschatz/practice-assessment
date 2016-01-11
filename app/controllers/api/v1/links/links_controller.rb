class Api::V1::Links::LinksController < ApplicationController
  respond_to :json

  def index
    respond_with current_user.links
  end
end
