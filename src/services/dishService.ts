import { PrismaClient } from '@prisma/client';

const prisma= new PrismaClient;

export const Dish_addToSystem= async (name:string, description:string, price:number,restaurantId:number,) =>{
    try{
        await prisma.dish.create({
            data: { name, description, price, restaurantId },
          });        
        }
        catch(err:any){
            throw err.message
        }
};


export const Dish_update= async (name:string,description:string,price:number,restaurantId:number, dishId:number) =>{
    try{
        prisma.dish.update({
            where: { id: dishId },
            data: { name, description, price, restaurantId},
          });
        }
    
        catch(err:any){
            throw err.message
        }
};

    
export const Dish_deleteById = async(dishId:number)=>{

    try {
      await prisma.dish.delete({ where: { id: dishId } });
  
   }
   catch(err:any){
     throw err.message   
   }
  
};


export const Dish_getByRestaurantId = async(restaurant_id:number)=>{
    try {
      return await prisma.dish.findMany({
        where: { restaurantId: restaurant_id },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
        },
          
      });
  
   }
   catch(err:any){
     throw err.message   
   }
};