
-- Enable RLS on user_vehicles table
ALTER TABLE public.user_vehicles ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own vehicles
CREATE POLICY "Users can view their own vehicles" 
  ON public.user_vehicles 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own vehicles
CREATE POLICY "Users can create their own vehicles" 
  ON public.user_vehicles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update their own vehicles
CREATE POLICY "Users can update their own vehicles" 
  ON public.user_vehicles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to delete their own vehicles
CREATE POLICY "Users can delete their own vehicles" 
  ON public.user_vehicles 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Enable RLS on fuel_calculations table
ALTER TABLE public.fuel_calculations ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own calculations
CREATE POLICY "Users can view their own calculations" 
  ON public.fuel_calculations 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own calculations
CREATE POLICY "Users can create their own calculations" 
  ON public.fuel_calculations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update their own calculations
CREATE POLICY "Users can update their own calculations" 
  ON public.fuel_calculations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to delete their own calculations
CREATE POLICY "Users can delete their own calculations" 
  ON public.fuel_calculations 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Enable RLS on monthly_fuel_budgets table
ALTER TABLE public.monthly_fuel_budgets ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own budgets
CREATE POLICY "Users can view their own budgets" 
  ON public.monthly_fuel_budgets 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own budgets
CREATE POLICY "Users can create their own budgets" 
  ON public.monthly_fuel_budgets 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update their own budgets
CREATE POLICY "Users can update their own budgets" 
  ON public.monthly_fuel_budgets 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to delete their own budgets
CREATE POLICY "Users can delete their own budgets" 
  ON public.monthly_fuel_budgets 
  FOR DELETE 
  USING (auth.uid() = user_id);
