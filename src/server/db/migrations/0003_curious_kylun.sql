ALTER TABLE "userSystemFoodLikes" ADD CONSTRAINT "userSystemFoodLikes_system_food_id_user_id_unique" UNIQUE("system_food_id","user_id");