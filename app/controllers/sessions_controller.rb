class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by(email: params[:login][:email])
    if @user && @user.authenticate(params[:login][:password])
      session[:user_id] = @user.id
      redirect_to links_path
    else
      flash.now[:errors] = "Invalid Login"
      render :new
    end
  end

  def delete
    session[:user_id] = nil
    redirect_to login_path
  end
end