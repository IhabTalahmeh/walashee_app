import { OpenAIApiService } from "./openaiApiService";

export const extractPatientInfoFromSticker = async (base64Image: string) => {
  const body = {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Extract patient info as JSON with keys: 
                patient_first_name, 
                patient_last_name, 
                date_of_birth (in 'yyyy-mm-dd' format),
                gender (MALE, FEMALE, NEUTRAL, EMPTY) => Search for signs or shortcuts and be sure of it,
                barcode,
                mrn (medical record number), // string || null, this is NOT barcode.
                
                All information must be extracted carefully.`
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`
            }
          }
        ]
      }
    ],
    max_tokens: 1000
  };

  try {
    const response: any = await OpenAIApiService.post('chat/completions', body);
    const content: any = response.choices[0].message.content
    const jsonString = content.replace(/^```json|```$/g, '').trim();

    try {
      const jsonObject = JSON.parse(jsonString);
      return jsonObject
    } catch (err: any) {
      throw new Error(`Failed to parse OpenAI response: ${err.message}`);
    }

  } catch (error: any) {
    if (error?.error) console.error('❌ Error Details:', error.error);
    throw error;
  }
}