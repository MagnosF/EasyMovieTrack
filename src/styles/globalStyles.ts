import { StyleSheet } from 'react-native';
import { Theme } from '../../constants/theme';

export const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    padding: Theme.spacing.lg,
  },
  title: {
    fontSize: 32,
    color: Theme.colors.primary,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 2,
    textShadowColor: Theme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  input: {
    backgroundColor: Theme.colors.surface,
    color: Theme.colors.text,
    padding: 15,
    borderRadius: Theme.radius.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D333B',
  },
  buttonPrimary: {
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: Theme.radius.md,
    alignItems: 'center',
    marginTop: 10,
    elevation: 8,
    shadowColor: Theme.colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  linkText: {
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 15,
  }
});