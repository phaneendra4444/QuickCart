import User from "@/models/User";
import connectDB from "@/config/db";
import {getAuth} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request){

    try{
        const {userId} = getAuth(request)

        await connectDB()
        const user = await User.findById(userId)

        if(!user){
            return NextResponse.json({success: false, message: "User Not found"})
        }

        return NextResponse.json({success: true, user})
    }
    catch(error){

        return NextResponse.json({success: false, message: error.message})
    }

}