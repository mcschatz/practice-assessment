class User < ActiveRecord::Base
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, message: "must have a minimum of 8 characters"}
  validates :password_confirmation, presence: true

  before_validation :capitalize

  def capitalize
    self.username = username.to_s.capitalize
  end
end