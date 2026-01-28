import { Ionicons } from '@expo/vector-icons';
import { OpacityButton } from '@/components/opacity-button';
import { TextError } from '@/components/text-error';
import { TextFormInput } from '@/components/text-form-input';
import { SafeView } from '@/components/safe-view';
import { CreateJobDataSchema, CreateJobFormDataSchema } from '@/services/api/job/job.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { z } from 'zod';
import { useAuth } from '@/services/auth/auth-context';
import { api } from '@/services/api';
import { getErrorMessage } from '@/helpers/get-error-message';

type FormValues = z.infer<typeof CreateJobFormDataSchema>;

export default function CreateJobPostingScreen() {
  const { company } = useAuth();
  const router = useRouter();
  const [image] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const { mutateAsync: createJob } = api.job.mutations.useCreateJob();

  // TODO: Implement image picker
  const handleAddImage = () => {
    // TODO: Image picker logic
  };

  const { control, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(CreateJobFormDataSchema),
    defaultValues: {
      companyId: company?.id,
      title: '',
      description: '',
      payoff: '',
      expiryDate: null,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (submitData: FormValues) => {
    setApiError(null);

    try {
      // Transform form data to API data
      const apiData = CreateJobDataSchema.parse({
        ...submitData,
        payoff: parseFloat(submitData.payoff),
      });
      await createJob(apiData);
      reset();
      router.back();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setApiError(errorMessage);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeView className="flex-1 bg-white" withPaddingBottom={false}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 py-8 pt-8">
          {/* Image upload section */}
          <View className="mb-5">
            <Text className="text-sm font-semibold mb-3">Send a photo:</Text>
            <TouchableOpacity
              className="h-[180px] w-full bg-gray-100 border-2 border-gray-300 rounded-2xl items-center justify-center mt-3"
              onPress={handleAddImage}
            >
              {image ? (
                <Image className="h-full w-full rounded-2xl" source={{ uri: image }} />
              ) : (
                <Ionicons color="#999" name="add" size={40} />
              )}
            </TouchableOpacity>
          </View>

          {/* Backend Error */}
          {apiError ? <TextError className="mb-3">{apiError}</TextError> : null}

          {/* Title (Position) */}
          <View className="mb-5">
            <TextFormInput
              control={control}
              label="Offered position"
              name="title"
              placeholder="e.g. Database Administrator"
            />
          </View>

          {/* Salary */}
          <View className="mb-5">
            <TextFormInput
              control={control}
              keyboardType="numeric"
              label="Salary"
              name="payoff"
              placeholder="e.g. $5,000"
            />
          </View>

          {/* Description */}
          <View className="mb-5">
            <TextFormInput
              multiline
              control={control}
              label="Description"
              name="description"
              numberOfLines={6}
              placeholder="Describe the offer..."
              style={{ minHeight: 160 }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      <View className="bg-white border-t border-gray-200 flex-row gap-3 pb-4 px-4 pt-3">
        <OpacityButton
          className="flex-1"
          disabled={formState.isSubmitting}
          variant="outline"
          onPress={handleBack}
        >
          Cancel
        </OpacityButton>
        <OpacityButton
          className="flex-1"
          disabled={formState.isSubmitting || (formState.isSubmitted && !formState.isValid)}
          isLoading={formState.isSubmitting}
          variant="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Add job posting
        </OpacityButton>
      </View>
    </SafeView>
  );
}
