class AddColumnToLinks < ActiveRecord::Migration
  def change
    add_column :links, :read_status, :string, default: "unread"
  end
end
