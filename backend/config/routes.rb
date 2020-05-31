Rails.application.routes.draw do
  get 'user_session/current'
  
  resources :posts do
    resources :comments, except: [:show]

    post :like_it, as: :like_it
    post :dislike_it, as: :dislike_it
  end
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
