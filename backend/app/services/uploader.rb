class Uploader
  def self.upload stream
    # to save file extension
    file_name = Time.now.to_i.to_s + stream.original_filename

    saving_path = Rails.root.join('public', 'upload', file_name)
    File.open(saving_path, 'wb') do |file|
      file.write(stream.read)
    end

    "/upload/#{file_name}"
  end
end