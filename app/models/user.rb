class User < ActiveRecord::Base
  has_secure_password
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, message: "must have a minimum of 8 characters"}
  validates :password_confirmation, presence: true
end