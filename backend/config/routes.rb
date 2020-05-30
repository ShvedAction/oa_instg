Rails.application.routes.draw do
  resources :posts do
    resources :comments

    post :like_it, as: :like_it
    post :dislike_it, as: :dislike_it
  end
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
