class Api::V1::Links::LinksController < ApplicationController
  respond_to :json

  def index
    respond_with current_user.links
  end

  def update
    # binding.pry
    @link = Link.update(params[:id], link_params)
    respond_with @link, json: @link
  end


  private

    def link_params
      params.require(:link).permit(:title, :url, :user_id)
    end
end
