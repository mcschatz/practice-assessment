class AddColumnToLinks < ActiveRecord::Migration
  def change
    add_column :links, :read_status, :boolean, default: false
  end
end
