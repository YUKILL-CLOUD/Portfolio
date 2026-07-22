'use server';

import { getSupabaseAdminClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function reorderItemsAction(table: string, items: { id: string; display_order: number }[]) {
    const supabase = getSupabaseAdminClient();
    if (!supabase) {
        return { success: false, message: 'Supabase client not configured.' };
    }

    try {
        for (const item of items) {
            await supabase.from(table).update({ display_order: item.display_order }).eq('id', item.id);
        }
        revalidatePath('/');
        return { success: true, message: 'Reordered successfully!' };
    } catch (err: any) {
        return { success: false, message: err.message || 'Failed to reorder items' };
    }
}
