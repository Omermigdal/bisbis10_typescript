import { PrismaClient } from '@prisma/client';

const prisma= new PrismaClient

export const getAll= async () =>{
try{
   return await prisma.restaurant.findMany();
    }
    catch(err:any){
        throw err.message
    }
};

export const getByCuisine = async (cuisine:string)=>{
  try{
   return await prisma.restaurant.findMany({
      where: {
        cuisines: {
          has: cuisine,
        },
      },
    });
  }
  catch(err:any){
    throw err.message
}
};

export const getById = async (_id: number) =>{
    try{
    return prisma.restaurant.findUnique({
      where: { id: _id },
      include: { dishes: true },
    });
  }
    catch(err:any){
      throw Error(err.messge)
  }
};

export const addToSystem = async (name:string,isKosher:boolean,cuisines:Array<string>) =>{
  try{
    await prisma.restaurant.create({
      data: { name, isKosher, cuisines },
    });
  }
  catch(err:any){
    throw err.message   
  }


};

export const update = async (_id:number,name:string, isKosher:boolean,cuisines:Array<string>) =>{
  try {
     await prisma.restaurant.update({
    where: { id: _id },
    data: { name, isKosher, cuisines },});
  }
  catch(err:any){
    throw err.message   
  }

};


export const deleteById = async(_id:number)=>{

  try {
    await prisma.restaurant.delete({ where: { id: _id } });

 }
 catch(err:any){
   throw err.message   
 }

};