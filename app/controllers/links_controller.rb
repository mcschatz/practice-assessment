class LinksController < ApplicationController
  def index
  end

  def create
    @link = Link.new(link_params)
    @link.user_id = current_user.id

    if @link.save
      redirect_to links_path
    else
      flash.now[:errors]
      redirect_to links_path
    end
  end

  private

  def link_params
    params.require(:link).permit(:title, :url, :user_id, :read_status)
  end
end