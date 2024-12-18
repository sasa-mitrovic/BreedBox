import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://noqwespmgqlljdchgvvv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vcXdlc3BtZ3FsbGpkY2hndnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NDkxNDUsImV4cCI6MjA1MDEyNTE0NX0.7sn85V4Yvy5ai9ZPWO6E29zDu_Y-EeefBwIwDqBcumU"
);