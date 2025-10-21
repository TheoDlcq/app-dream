// components/DreamForm.tsx

import { AsyncStorageConfig } from '@/constants/AsyncStorageConfig';
import {
  DreamClarity,
  DreamData,
  DreamTone,
  DreamType,
  EmotionalState,
  SleepQuality
} from '@/interfaces/DreamData';
import { AsyncStorageService } from '@/services/AsyncStorageService';
import { useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Button,
  Chip,
  IconButton,
  SegmentedButtons,
  Surface,
  Text,
  TextInput,
  useTheme
} from 'react-native-paper';


const { width } = Dimensions.get('window');

export default function DreamForm() {
  const theme = useTheme();
  const [dreamText, setDreamText] = useState<string>('');
  const [isLucidDream, setIsLucidDream] = useState<boolean>(false);
  const [dreamDate, setDreamDate] = useState<string>(new Date().toISOString());
  const [dreamType, setDreamType] = useState<DreamType>('ordinary');
  const [emotionalStateBefore, setEmotionalStateBefore] = useState<EmotionalState>('neutral');
  const [emotionalStateAfter, setEmotionalStateAfter] = useState<EmotionalState>('neutral');
  const [characters, setCharacters] = useState<string[]>([]);
  const [characterInput, setCharacterInput] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [emotionalIntensity, setEmotionalIntensity] = useState<number>(5);
  const [clarity, setClarity] = useState<DreamClarity>('moderate');
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [sleepQuality, setSleepQuality] = useState<SleepQuality>('good');
  const [personalMeaning, setPersonalMeaning] = useState<string>('');
  const [dreamTone, setDreamTone] = useState<DreamTone>('neutral');
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddCharacter = () => {
    if (characterInput.trim() && !characters.includes(characterInput.trim())) {
      setCharacters([...characters, characterInput.trim()]);
      setCharacterInput('');
    }
  };

  const handleRemoveCharacter = (characterToRemove: string) => {
    setCharacters(characters.filter(char => char !== characterToRemove));
  };


  const handleDreamSubmission = async (): Promise<void> => {
    try {
      const formDataArray: DreamData[] = await AsyncStorageService.getData(AsyncStorageConfig.keys.dreamsArrayKey);

      const newDream: DreamData = {
        dreamText,
        isLucidDream,
        dreamDate,
        dreamType,
        emotionalStateBefore,
        emotionalStateAfter,
        characters,
        location,
        emotionalIntensity,
        clarity,
        tags,
        sleepQuality,
        personalMeaning,
        dreamTone,
        createdAt: new Date().toISOString(),
      };

      formDataArray.push(newDream);
      await AsyncStorageService.setData(AsyncStorageConfig.keys.dreamsArrayKey, formDataArray);

    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }

    // Réinitialisation des champs
    setDreamText('');
    setIsLucidDream(false);
    setDreamType('ordinary');
    setEmotionalStateBefore('neutral');
    setEmotionalStateAfter('neutral');
    setCharacters([]);
    setLocation('');
    setEmotionalIntensity(5);
    setClarity('moderate');
    setTags([]);
    setSleepQuality('good');
    setPersonalMeaning('');
    setDreamTone('neutral');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={styles.scrollView}>
          <Surface style={styles.surface}>
            {/* Section Date et Type de rêve */}
            <View style={styles.section}>
              <Text variant="titleMedium">Date et Type</Text>
              <Button 
                mode="outlined" 
                onPress={() => setDatePickerVisible(true)}
                style={styles.dateButton}
              >
                {new Date(dreamDate).toLocaleDateString()}
              </Button>

              <SegmentedButtons
                value={dreamType}
                onValueChange={setDreamType}
                buttons={[
                  { value: 'ordinary', label: 'Normal' },
                  { value: 'lucid', label: 'Lucide' },
                  { value: 'nightmare', label: 'Cauchemar' },
                ]}
              />
            </View>

            {/* Description du rêve */}
            <View style={styles.section}>
              <Text variant="titleMedium">Description</Text>
              <TextInput
                label="Décrivez votre rêve"
                value={dreamText}
                onChangeText={setDreamText}
                mode="outlined"
                multiline
                numberOfLines={6}
                style={styles.input}
              />
            </View>

            {/* État émotionnel */}
            <View style={styles.section}>
              <Text variant="titleMedium">État émotionnel</Text>
              <Text variant="bodySmall">Avant le rêve</Text>
              <SegmentedButtons
                value={emotionalStateBefore}
                onValueChange={setEmotionalStateBefore}
                buttons={[
                  { value: 'very_negative', label: '😢' },
                  { value: 'negative', label: '🙁' },
                  { value: 'neutral', label: '😐' },
                  { value: 'positive', label: '🙂' },
                  { value: 'very_positive', label: '😊' },
                ]}
              />
              
              <Text variant="bodySmall" style={{marginTop: 8}}>Après le rêve</Text>
              <SegmentedButtons
                value={emotionalStateAfter}
                onValueChange={setEmotionalStateAfter}
                buttons={[
                  { value: 'very_negative', label: '😢' },
                  { value: 'negative', label: '🙁' },
                  { value: 'neutral', label: '😐' },
                  { value: 'positive', label: '🙂' },
                  { value: 'very_positive', label: '😊' },
                ]}
              />
            </View>

            {/* Lieu et personnages */}
            <View style={styles.section}>
              <Text variant="titleMedium">Lieu et personnages</Text>
              <TextInput
                label="Lieu du rêve"
                value={location}
                onChangeText={setLocation}
                mode="outlined"
                style={styles.input}
              />

              <View style={styles.chipInput}>
                <TextInput
                  label="Ajouter un personnage"
                  value={characterInput}
                  onChangeText={setCharacterInput}
                  mode="outlined"
                  style={[styles.input, { flex: 1 }]}
                />
                <IconButton
                  icon="plus"
                  onPress={handleAddCharacter}
                />
              </View>

              <View style={styles.chipContainer}>
                {characters.map((character, index) => (
                  <Chip
                    key={index}
                    onClose={() => handleRemoveCharacter(character)}
                    style={styles.chip}
                  >
                    {character}
                  </Chip>
                ))}
              </View>
            </View>

            {/* Intensité et clarté */}
            <View style={styles.section}>
              <Text variant="titleMedium">Intensité émotionnelle ({emotionalIntensity})</Text>
              <View style={styles.sliderContainer}>
                <Text>1</Text>
                <View style={styles.slider}>
                  <TextInput
                    value={emotionalIntensity.toString()}
                    onChangeText={(value) => setEmotionalIntensity(Number(value) || 1)}
                    keyboardType="numeric"
                    mode="outlined"
                    style={styles.numberInput}
                  />
                </View>
                <Text>10</Text>
              </View>

              <Text variant="titleMedium" style={{marginTop: 16}}>Clarté du rêve</Text>
              <SegmentedButtons
                value={clarity}
                onValueChange={setClarity}
                buttons={[
                  { value: 'very_clear', label: 'Très clair' },
                  { value: 'clear', label: 'Clair' },
                  { value: 'moderate', label: 'Moyen' },
                  { value: 'fuzzy', label: 'Flou' },
                ]}
              />
            </View>

            {/* Tags */}
            <View style={styles.section}>
              <Text variant="titleMedium">Mots-clés</Text>
              <View style={styles.chipInput}>
                <TextInput
                  label="Ajouter un mot-clé"
                  value={tagInput}
                  onChangeText={setTagInput}
                  mode="outlined"
                  style={[styles.input, { flex: 1 }]}
                />
                <IconButton
                  icon="plus"
                  onPress={handleAddTag}
                />
              </View>

              <View style={styles.chipContainer}>
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    onClose={() => handleRemoveTag(tag)}
                    style={styles.chip}
                  >
                    {tag}
                  </Chip>
                ))}
              </View>
            </View>

            {/* Qualité du sommeil et signification */}
            <View style={styles.section}>
              <Text variant="titleMedium">Qualité du sommeil</Text>
              <SegmentedButtons
                value={sleepQuality}
                onValueChange={setSleepQuality}
                buttons={[
                  { value: 'excellent', label: 'Excellent' },
                  { value: 'good', label: 'Bon' },
                  { value: 'fair', label: 'Moyen' },
                  { value: 'poor', label: 'Mauvais' },
                ]}
              />

              <TextInput
                label="Signification personnelle"
                value={personalMeaning}
                onChangeText={setPersonalMeaning}
                mode="outlined"
                multiline
                numberOfLines={4}
                style={[styles.input, { marginTop: 16 }]}
              />
            </View>

            {/* Tonalité globale */}
            <View style={styles.section}>
              <Text variant="titleMedium">Tonalité globale</Text>
              <SegmentedButtons
                value={dreamTone}
                onValueChange={setDreamTone}
                buttons={[
                  { value: 'positive', label: 'Positive' },
                  { value: 'neutral', label: 'Neutre' },
                  { value: 'negative', label: 'Négative' },
                ]}
              />
            </View>

            <Button
              mode="contained"
              onPress={handleDreamSubmission}
              style={styles.submitButton}
            >
              Enregistrer le rêve
            </Button>
          </Surface>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  surface: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 4,
  },
  section: {
    marginBottom: 24,
  },
  input: {
    marginVertical: 8,
  },
  dateButton: {
    marginVertical: 8,
  },
  chipInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    margin: 4,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  slider: {
    flex: 1,
    marginHorizontal: 8,
  },
  numberInput: {
    height: 40,
    textAlign: 'center',
  },
  submitButton: {
    marginVertical: 16,
  },
});
