import {prisma} from "../src/database.js";

async function main(){
    await prisma.user.upsert({
        where:{
            email: "test@mail.com"
        },
        update:{},
        create:{
            email:"test@mail.com",
            password: "123"
        }
    });
}

main().catch((e)=> {
    console.log(e);
    process.exit(1);
}).finally( async()=> {
    await prisma.$disconnect();
});