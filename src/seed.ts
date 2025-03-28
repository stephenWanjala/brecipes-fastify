import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

export default async function seedRecipes() {
    try {
        console.log('Seeding recipes...');

        // Read JSON data
        const filePath = path.resolve(__dirname, 'recipes.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const recipes = JSON.parse(rawData) as any[];

        const adminId = process.env.ADMIN_ID;

        const recipesToCreate = recipes.map((recipe) => ({
            title: recipe.title,
            description: recipe.description,
            cuisine: recipe.cuisine,
            image: recipe.image || null,
            sourceUrl: recipe.sourceUrl || null,
            chefName: recipe.chefName,
            preparationTime: recipe.preparationTime,
            cookingTime: recipe.cookingTime,
            serves: recipe.serves,
            ingredientsDesc: recipe.ingredientsDesc,
            ingredients: recipe.ingredients,
            method: recipe.method,
            userId: adminId,
        }));

        console.log(`Total recipes to insert: ${recipesToCreate.length}`);

        // Delete existing recipes
        await prisma.recipe.deleteMany({});
        console.log('Existing recipes deleted.');

        // Batch insert using Promise.all() for performance
        const batchSize = 1000;
        const batchPromises = [];

        for (let i = 0; i < recipesToCreate.length; i += batchSize) {
            const batch = recipesToCreate.slice(i, i + batchSize);
            batchPromises.push(
                prisma.recipe.createMany({
                    data: batch,
                    skipDuplicates: true,
                })
            );
            console.log(`Queued batch ${i / batchSize + 1}`);
        }

        // Execute all batches in parallel
        await Promise.all(batchPromises);

        console.log('All recipes seeded successfully!');
    } catch (error) {
        console.error('Error seeding recipes:', error);
    } finally {
        await prisma.$disconnect();
    }
}
