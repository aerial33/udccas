'use client'

import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { getClientSideURL } from '@/utilities/getURL'
import type { FormBlock as FormBlockType } from '@/payload-types'

import { fields } from './fields'

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const { enableIntro, form: formFromProps, introContent } = props

  // Handle case where form might be just an ID - in practice it should always be populated
  const formData = typeof formFromProps === 'object' ? formFromProps : null
  if (!formData) {
    console.error('Form data is not populated')
    return null
  }

  const { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } =
    formData

  const formMethods = useForm({
    defaultValues: formData.fields || [],
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Erreur interne du serveur',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Une erreur est survenue.',
          })
        }
      }

      submitForm().catch((error) => {
        console.error('Erreur lors de la soumission du formulaire:', error)
        setIsLoading(false)
        setError({
          message: 'Une erreur est survenue lors de la soumission.',
        })
      })
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="border-border rounded-[0.8rem] border p-4 lg:p-6">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && confirmationMessage && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Chargement, veuillez patienter...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={String(formID)} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formData &&
                  formData.fields &&
                  formData.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formData}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button form={String(formID)} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
