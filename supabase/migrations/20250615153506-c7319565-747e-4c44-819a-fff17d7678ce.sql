
-- First, create a trigger function to automatically create partner records
CREATE OR REPLACE FUNCTION public.handle_partner_registration()
RETURNS TRIGGER AS $$
BEGIN
    -- Only create partner record if role is 'partner' and record doesn't exist
    IF NEW.role = 'partner' THEN
        INSERT INTO public.partners (profile_id, status, commission_rate, created_at, updated_at)
        VALUES (NEW.id, 'pending', 5.00, now(), now())
        ON CONFLICT (profile_id) DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger that fires after profile insert or update
DROP TRIGGER IF EXISTS on_profile_partner_created ON public.profiles;
CREATE TRIGGER on_profile_partner_created
    AFTER INSERT OR UPDATE ON public.profiles
    FOR EACH ROW 
    WHEN (NEW.role = 'partner')
    EXECUTE FUNCTION public.handle_partner_registration();

-- Add unique constraint to prevent duplicate partner records
ALTER TABLE public.partners 
ADD CONSTRAINT partners_profile_id_unique UNIQUE (profile_id);

-- Insert partner record for existing partner user (Carlos)
INSERT INTO public.partners (profile_id, status, commission_rate, created_at, updated_at)
SELECT id, 'active', 5.00, now(), now()
FROM public.profiles 
WHERE role = 'partner' 
AND id NOT IN (SELECT profile_id FROM public.partners WHERE profile_id IS NOT NULL)
ON CONFLICT (profile_id) DO NOTHING;

-- Add RLS policies for partners table
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Policy for partners to view their own data
CREATE POLICY "Partners can view own data" ON public.partners
    FOR SELECT USING (profile_id = auth.uid());

-- Policy for partners to update their own data
CREATE POLICY "Partners can update own data" ON public.partners
    FOR UPDATE USING (profile_id = auth.uid());

-- Policy for admin access (if needed later)
CREATE POLICY "Admin can manage partners" ON public.partners
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Add RLS policies for partner_links table
ALTER TABLE public.partner_links ENABLE ROW LEVEL SECURITY;

-- Policy for partners to manage their own links
CREATE POLICY "Partners can manage own links" ON public.partner_links
    FOR ALL USING (
        partner_id IN (
            SELECT id FROM public.partners 
            WHERE profile_id = auth.uid()
        )
    );
