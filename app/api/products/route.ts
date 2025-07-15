import {supabaseRoute} from "@/lib/supabaseRoute";
import { ok, fail } from "@/lib/jsonResponse";

export const revalidate = 60; // 60sec revalidation for this route

export  async function GET(){

    const db=supabaseRoute();

    //read-only view we have created suing SQL --homepage_products

    const {data,error} = await db.from("homepage_products").select("*");

    if(error) return fail(error.message, 500);

    return ok(data);

}


//this will be used to fetch products for the homepage , drop pages and autosearch complete features 

