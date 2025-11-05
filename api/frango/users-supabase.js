import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase env vars missing:', {
    url: !!supabaseUrl,
    key: !!supabaseKey,
  });
}

let supabase = null;

function getSupabase() {
  if (!supabase) {
    console.log('🔌 Creating Supabase client...');
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

// Get all users
export async function getUsers() {
  try {
    const db = getSupabase();
    const { data, error } = await db
      .from('frango_users')
      .select('*')
      .order('totalRolls', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
}

// Find user by username
export async function findUserByUsername(username) {
  try {
    const db = getSupabase();
    const { data, error } = await db
      .from('frango_users')
      .select('*')
      .eq('username', username)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
    return data || null;
  } catch (error) {
    console.error('Error finding user by username:', error);
    return null;
  }
}

// Find user by ID
export async function findUserById(userId) {
  try {
    const db = getSupabase();
    const { data, error } = await db
      .from('frango_users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    return null;
  }
}

// Create new user
export async function createNewUser(username) {
  try {
    console.log('📝 Creating user:', username);
    const db = getSupabase();

    const newUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      username,
      totalRolls: 0,
      collection: [],
      deck: [],
      lastPull: 0,
      createdAt: new Date().toISOString(),
    };

    console.log('📝 User object:', newUser);

    const { data, error } = await db
      .from('frango_users')
      .insert([newUser])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase insert error:', error);
      throw error;
    }

    console.log('✅ User created:', data);
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Add chicken to user's deck
export async function addChickenToUserDb(userId, chickenId) {
  try {
    console.log('🎟️ Adding chicken to user:', { userId, chickenId });
    const db = getSupabase();

    // Get current user
    const { data: user, error: getUserError } = await db
      .from('frango_users')
      .select('*')
      .eq('id', userId)
      .single();

    if (getUserError) {
      console.error('❌ Error getting user:', getUserError);
      throw getUserError;
    }

    if (!user) {
      console.error('❌ User not found:', userId);
      return false;
    }

    console.log('👤 Found user:', user.username);

    // Check if max pulls reached
    if (user.totalRolls >= 100) {
      console.log('⚠️ Max pulls reached for user:', userId);
      return false;
    }

    // Update user
    const updatedCollection = [...(user.collection || []), chickenId];
    console.log('📝 Updating collection:', updatedCollection);

    const { error: updateError } = await db
      .from('frango_users')
      .update({
        totalRolls: user.totalRolls + 1,
        collection: updatedCollection,
        lastPull: new Date().toISOString(),
      })
      .eq('id', userId);

    if (updateError) {
      console.error('❌ Error updating user:', updateError);
      throw updateError;
    }

    console.log('✅ Chicken added successfully');
    return true;
  } catch (error) {
    console.error('Error adding chicken:', error);
    return false;
  }
}

// Get ranking (top 10)
export async function getRankingDb() {
  try {
    const db = getSupabase();
    const { data, error } = await db
      .from('frango_users')
      .select('*')
      .order('totalRolls', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting ranking:', error);
    return [];
  }
}

// Get user with deck
export async function getUserWithDeck(userId) {
  try {
    const db = getSupabase();
    const { data, error } = await db
      .from('frango_users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  } catch (error) {
    console.error('Error getting user with deck:', error);
    return null;
  }
}
