import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { BoothFilter } from '../features/booths/types'

export const supportedLanguages = ['ja', 'en', 'es', 'hi', 'zh', 'fr', 'ar'] as const

export type LanguageCode = (typeof supportedLanguages)[number]

type AgeGroupValue = 'Under 18' | '18-22' | '23-29' | '30-39' | '40+'

type TranslationSet = {
  nav: Record<'home' | 'booths' | 'groups' | 'chat' | 'myTown' | 'guide' | 'profile', string>
  topbar: {
    tagline: string
    openNavigation: string
    closeSidebar: string
    logout: string
    loggingOut: string
    unableToLogout: string
    primaryNavigation: string
  }
  home: {
    eyebrow: string
    title: string
    description: string
    exploreBooths: string
    mockData: string
    doneTitle: string
    doneItems: [string, string, string, string]
    highlights: [
      { title: string; detail: string },
      { title: string; detail: string },
      { title: string; detail: string },
    ]
  }
  booths: {
    title: string
    subtitle: string
    loading: string
    empty: string
    officialSection: string
    communitySection: string
    officialBadge: string
    see: string
    groupCount: (count: number) => string
    categories: Record<BoothFilter, string>
  }
  groups: {
    title: string
    subtitle: string
    createButton: string
    listTitle: string
    availability: string
    private: string
    members: (current: number, capacity: number) => string
    modalTitle: string
    closeDialog: string
    groupNameLabel: string
    groupNamePlaceholder: string
    selectBoothLabel: string
    selectBoothPlaceholder: string
    descriptionLabel: string
    descriptionPlaceholder: string
    maxPeopleLabel: string
    privateOnly: string
    submit: string
    errors: {
      requiredName: string
      chooseBooth: string
      minCapacity: string
    }
  }
  guide: {
    title: string
    subtitle: string
    learnedCount: (count: number) => string
    announcementTitle: string
    announcementText: string
    emptyTitle: string
    emptyText: string
    hint: string
  }
  placeholders: {
    chat: {
      eyebrow: string
      title: string
      description: string
    }
    myTown: {
      eyebrow: string
      title: string
      description: string
    }
  }
  profile: {
    title: string
    subtitle: string
    nicknameLabel: string
    nicknamePlaceholder: string
    nicknameHelp: string
    ageGroupLabel: string
    ageGroupPlaceholder: string
    languageSettings: string
    selectedLanguage: (flag: string, label: string) => string
    avatarColor: string
    selfIntroductionLabel: string
    selfIntroductionPlaceholder: string
    preview: string
    ageGroupPending: string
    saveProfile: string
    previewNameFallback: string
    ageGroups: Record<AgeGroupValue, string>
  }
  errorPage: {
    unexpectedRouteError: string
    pageNotFound: string
    somethingWentWrong: string
    notFoundMessage: string
    genericMessage: string
    goBack: string
    returnHome: string
    helper: string
  }
  login: {
    badge: string
    heroTitle: string
    heroDescription: string
    featureCards: [
      { title: string; detail: string },
      { title: string; detail: string },
      { title: string; detail: string },
    ]
    welcomeBack: string
    signInTitle: string
    mvpPreview: string
    email: string
    password: string
    emailPlaceholder: string
    passwordPlaceholder: string
    rememberMe: string
    forgotPassword: string
    signIn: string
    signingIn: string
    divider: string
    signUpWithEmail: string
    continueWithGoogle: string
    newHere: string
    exploreApp: string
    showPassword: string
    hidePassword: string
    missingCredentials: string
    unableToSignIn: string
  }
  register: {
    badge: string
    heroTitle: string
    heroDescription: string
    featureCards: [
      { title: string; detail: string },
      { title: string; detail: string },
      { title: string; detail: string },
    ]
    createProfile: string
    registerWithEmail: string
    newAccount: string
    firstName: string
    lastName: string
    emailAddress: string
    sendValidationCode: string
    sending: string
    resendValidationCode: string
    emailVerified: string
    validationCode: string
    validationCodePlaceholder: string
    verifyCode: string
    verifyingCode: string
    password: string
    confirmPassword: string
    createPasswordPlaceholder: string
    confirmPasswordPlaceholder: string
    username: string
    displayName: string
    location: string
    nickname: string
    language: string
    profileFocus: string
    ageGroup: string
    avatarColor: string
    selfIntroduction: string
    selfIntroductionPlaceholder: string
    receiveUpdates: string
    createAccount: string
    creatingAccount: string
    divider: string
    continueWithGoogle: string
    alreadyRegistered: string
    signInInstead: string
    showPassword: string
    hidePassword: string
    emailCodeSent: (email: string) => string
    emailVerifiedMessage: string
    errors: {
      invalidEmail: string
      unableToSendCode: string
      requestCodeFirst: string
      invalidCode: string
      unableToVerifyCode: string
      verifyEmailFirst: string
      requiredIdentity: string
      requiredPassword: string
      passwordMismatch: string
      unableToCreateAccount: string
    }
    success: {
      accountCreated: string
    }
    options: {
      profileFocus: [string, string, string]
      ageGroups: [
        { label: string; value: 'adult' },
        { label: string; value: 'teen' },
        { label: string; value: 'senior' },
      ]
      avatarColors: [string, string, string, string, string]
      languageOptions: [string, string, string, string, string]
    }
  }
}

export const supportedLanguageDetails: Record<
  LanguageCode,
  { label: string; nativeLabel: string; flag: string }
> = {
  ja: { label: 'Japanese', nativeLabel: '日本語', flag: '🇯🇵' },
  en: { label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  es: { label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸' },
  hi: { label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳' },
  zh: { label: 'Chinese', nativeLabel: '中文', flag: '🇨🇳' },
  fr: { label: 'French', nativeLabel: 'Français', flag: '🇫🇷' },
  ar: { label: 'Arabic', nativeLabel: 'العربية', flag: '🇸🇦' },
}

const translations: Record<LanguageCode, TranslationSet> = {
  en: {
    nav: {
      home: 'Home',
      booths: 'Booths',
      groups: 'Groups',
      chat: 'Personal Chat',
      myTown: 'My Town',
      guide: 'Guide',
      profile: 'Profile',
    },
    topbar: {
      tagline: 'Connect, learn, and nurture',
      openNavigation: 'Open navigation',
      closeSidebar: 'Close sidebar',
      logout: 'Logout',
      loggingOut: 'Logging out...',
      unableToLogout: 'Unable to log out right now.',
      primaryNavigation: 'Primary navigation',
    },
    home: {
      eyebrow: 'SweetTea MVP',
      title: 'A warmer way to find trusted booths, groups, and local support.',
      description:
        'The first release focuses on fast discovery: a clean app shell, guided booth categories, and a clear split between official resources and community-led spaces.',
      exploreBooths: 'Explore Booths',
      mockData: 'Mock data ready for UI development',
      doneTitle: 'Definition of done',
      doneItems: [
        'Local dev runs with Vite and a routed app shell.',
        'Booths can be filtered by category.',
        'Official and community booths render in separate sections.',
        'All planned routes exist, even where content is still placeholder.',
      ],
      highlights: [
        { title: 'Official support', detail: 'Campus-backed booths for essentials, health, and guidance.' },
        { title: 'Community energy', detail: 'Peer-led rooms and topic clusters that update quickly.' },
        { title: 'Low-friction discovery', detail: 'Find the right space by category before you join a group.' },
      ],
    },
    booths: {
      title: 'Booth List',
      subtitle: 'A place where themed groups gather',
      loading: 'Loading booth data...',
      empty: 'No booths match this category yet. Try switching to another tab.',
      officialSection: 'Official Booths',
      communitySection: "Everyone's Booths",
      officialBadge: 'Official',
      see: 'See',
      groupCount: (count) => `${count} groups`,
      categories: {
        All: 'All',
        Meals: 'Meals',
        'School Life': 'School Life',
        'Menstruation and Physical Condition': 'Menstruation and Physical Condition',
        Work: 'Work',
        Romance: 'Romance',
        hobby: 'Hobby',
        'Medical Care': 'Medical Care',
        Other: 'Other',
      },
    },
    groups: {
      title: 'Group',
      subtitle: 'A safe place to have deep conversations with a small group',
      createButton: 'Create a new group',
      listTitle: 'Groups you can participate in',
      availability: 'Participation Available',
      private: 'Private',
      members: (current, capacity) => `${current} / ${capacity} people`,
      modalTitle: 'Create a new group',
      closeDialog: 'Close create group dialog',
      groupNameLabel: 'Group Name *',
      groupNamePlaceholder: 'Example: Support room for students in their 20s',
      selectBoothLabel: 'Select your booth *',
      selectBoothPlaceholder: 'Please choose your booth',
      descriptionLabel: 'Description',
      descriptionPlaceholder: 'Describe what this group is for.',
      maxPeopleLabel: 'Maximum number of people',
      privateOnly: 'Hold a private group (invitation only)',
      submit: 'Create a group',
      errors: {
        requiredName: 'Group name is required.',
        chooseBooth: 'Please choose a booth before creating a group.',
        minCapacity: 'Maximum number of people must be at least 2.',
      },
    },
    guide: {
      title: 'Your Knowledge Collection',
      subtitle: 'The little facts I learned by logging in accumulate every day.',
      learnedCount: (count) => `${count} pieces of knowledge collected so far.`,
      announcementTitle: 'Important Announcements',
      announcementText:
        'The information provided here is general knowledge. Consult your doctor before changing medication or treatment, and seek urgent care promptly in an emergency.',
      emptyTitle: 'No trivia yet.',
      emptyText: 'Log in daily to get new trivia added here.',
      hint: 'Log in again tomorrow and collect your first trivia!',
    },
    placeholders: {
      chat: {
        eyebrow: 'Personal Chat',
        title: 'Private conversation surfaces can be layered in after the core discovery flow ships.',
        description:
          'The route exists now so navigation and layout remain stable. Messaging behavior, unread state, and conversation storage can be added later without reworking the shell.',
      },
      myTown: {
        eyebrow: 'My Town',
        title: 'Local community context has a dedicated route and room to grow.',
        description:
          'Use this page later for neighborhood updates, nearby resources, and place-based recommendations once the foundational browsing experience is in place.',
      },
    },
    profile: {
      title: 'Profile Settings',
      subtitle: 'Use SweetTea anonymously with peace of mind.',
      nicknameLabel: 'Nickname',
      nicknamePlaceholder: 'Please enter your favorite nickname.',
      nicknameHelp: 'Other members will see this name.',
      ageGroupLabel: 'Age Group',
      ageGroupPlaceholder: 'Please select your age group.',
      languageSettings: 'Language Settings',
      selectedLanguage: (flag, label) => `Selected language: ${flag} ${label}`,
      avatarColor: 'Avatar Color',
      selfIntroductionLabel: 'Self-introduction (optional)',
      selfIntroductionPlaceholder: 'Tell us a little about yourself.',
      preview: 'Preview',
      ageGroupPending: 'Age group pending',
      saveProfile: 'Save profile',
      previewNameFallback: 'Nickname',
      ageGroups: {
        'Under 18': 'Under 18',
        '18-22': '18-22',
        '23-29': '23-29',
        '30-39': '30-39',
        '40+': '40+',
      },
    },
    errorPage: {
      unexpectedRouteError: 'Unexpected route error',
      pageNotFound: 'Page not found',
      somethingWentWrong: 'Something went wrong',
      notFoundMessage: 'The page you requested does not exist or may have been moved.',
      genericMessage: 'The page could not be loaded. Try going back or return to the home page.',
      goBack: 'Go back',
      returnHome: 'Return home',
      helper: 'If this keeps happening, check the router configuration or confirm the requested URL is valid.',
    },
    login: {
      badge: 'SweetTea Login',
      heroTitle: 'Find your next trusted community space.',
      heroDescription:
        'Sign in to save favorite booths, join local groups, and keep your guide tailored to what matters in your area.',
      featureCards: [
        { title: 'Saved booths', detail: 'Keep official and community resources in one shortlist.' },
        { title: 'Local groups', detail: 'Track conversations and meetup spaces without digging around.' },
        { title: 'Personal guide', detail: 'Return to the support paths you care about most.' },
      ],
      welcomeBack: 'Welcome back',
      signInTitle: 'Sign in to SweetTea',
      mvpPreview: 'MVP preview',
      email: 'Email',
      password: 'Password',
      emailPlaceholder: 'you@example.com',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      divider: 'or continue with',
      signUpWithEmail: 'Sign up with your email address',
      continueWithGoogle: 'Continue with Google account',
      newHere: 'New here?',
      exploreApp: 'Explore the app',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      missingCredentials: 'Enter both your email and password to sign in.',
      unableToSignIn: 'Unable to sign in right now.',
    },
    register: {
      badge: 'SweetTea Register',
      heroTitle: 'Create your SweetTea account.',
      heroDescription:
        'Register with your email, set your password, and add a few profile details so the app can tailor booths, groups, and guide recommendations to you.',
      featureCards: [
        { title: 'Email-based access', detail: 'Use your own email address to sign up and manage your account.' },
        { title: 'Profile setup', detail: 'Add the basics now so your dashboard feels personal from the start.' },
        { title: 'Local discovery', detail: 'Help SweetTea surface nearby community spaces and support resources.' },
      ],
      createProfile: 'Create profile',
      registerWithEmail: 'Register with email',
      newAccount: 'New account',
      firstName: 'First name',
      lastName: 'Last name',
      emailAddress: 'Email address',
      sendValidationCode: 'Send validation code',
      sending: 'Sending...',
      resendValidationCode: 'Resend validation code',
      emailVerified: 'Email verified',
      validationCode: 'Validation code',
      validationCodePlaceholder: 'Enter 6-digit code',
      verifyCode: 'Verify code',
      verifyingCode: 'Verifying...',
      password: 'Password',
      confirmPassword: 'Confirm password',
      createPasswordPlaceholder: 'Create a password',
      confirmPasswordPlaceholder: 'Repeat your password',
      username: 'Username',
      displayName: 'Display name',
      location: 'Location',
      nickname: 'Nickname',
      language: 'Language',
      profileFocus: 'Profile focus',
      ageGroup: 'Age group',
      avatarColor: 'Avatar color',
      selfIntroduction: 'Self introduction',
      selfIntroductionPlaceholder: 'I like helping my community.',
      receiveUpdates: 'Send me occasional updates about new booths, guides, and community activities in my area.',
      createAccount: 'Create account',
      creatingAccount: 'Creating account...',
      divider: 'or',
      continueWithGoogle: 'Continue with Google account',
      alreadyRegistered: 'Already registered?',
      signInInstead: 'Sign in instead',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      emailCodeSent: (email) => `Validation code sent to ${email}. Enter the 6-digit code to continue.`,
      emailVerifiedMessage: 'Email address verified. You can finish creating your account.',
      errors: {
        invalidEmail: 'Please enter a valid email address before requesting a code.',
        unableToSendCode: 'Unable to send a validation code right now.',
        requestCodeFirst: 'Request a validation code first.',
        invalidCode: 'Enter a valid 6-digit validation code.',
        unableToVerifyCode: 'Unable to verify the code right now.',
        verifyEmailFirst: 'Verify your email address before creating your account.',
        requiredIdentity: 'Username, first name, and last name are required.',
        requiredPassword: 'Enter and confirm your password before creating your account.',
        passwordMismatch: 'Password and confirm password must match.',
        unableToCreateAccount: 'Unable to create your account right now.',
      },
      success: {
        accountCreated: 'Account created successfully. You can sign in now.',
      },
      options: {
        profileFocus: [
          'I am looking for community resources',
          'I help organize support groups',
          'I want both resources and local groups',
        ],
        ageGroups: [
          { label: 'Adult', value: 'adult' },
          { label: 'Teen', value: 'teen' },
          { label: 'Senior', value: 'senior' },
        ],
        avatarColors: ['Lavender', 'Coral', 'Sky', 'Mint', 'Sunflower'],
        languageOptions: ['English', 'Spanish', 'Chinese', 'Vietnamese', 'Other'],
      },
    },
  },
  ja: {
    nav: { home: 'ホーム', booths: 'ブース', groups: 'グループ', chat: '個別チャット', myTown: 'マイタウン', guide: 'ガイド', profile: 'プロフィール' },
    topbar: {
      tagline: 'つながり、学び、支え合う',
      openNavigation: 'ナビゲーションを開く',
      closeSidebar: 'サイドバーを閉じる',
      logout: 'ログアウト',
      loggingOut: 'ログアウト中...',
      unableToLogout: '今はログアウトできません。',
      primaryNavigation: 'メインナビゲーション',
    },
    home: {
      eyebrow: 'SweetTea MVP',
      title: '信頼できるブース、グループ、地域の支援をやさしく見つけられる場所。',
      description: '最初のリリースでは、見つけやすさを重視しています。すっきりしたアプリ構成、案内付きカテゴリ、公式情報とコミュニティ情報の明確な分離を用意しました。',
      exploreBooths: 'ブースを見る',
      mockData: 'UI 開発用のモックデータを利用可能',
      doneTitle: '完了条件',
      doneItems: ['Vite とルーティング済みのアプリがローカルで起動する。', 'ブースをカテゴリで絞り込める。', '公式ブースとコミュニティブースが分かれて表示される。', '内容が未実装でも予定ルートは存在する。'],
      highlights: [
        { title: '公式サポート', detail: '健康や生活に関する学校公認の支援ブース。' },
        { title: 'コミュニティの力', detail: '仲間主導の部屋や話題別スペースをすばやく見つけられます。' },
        { title: '気軽に探せる', detail: 'グループ参加前にカテゴリから合う場所を見つけられます。' },
      ],
    },
    booths: {
      title: 'ブース一覧',
      subtitle: 'テーマ別のグループが集まる場所',
      loading: 'ブース情報を読み込み中...',
      empty: 'このカテゴリに一致するブースはまだありません。別のタブを試してください。',
      officialSection: '公式ブース',
      communitySection: 'みんなのブース',
      officialBadge: '公式',
      see: '見る',
      groupCount: (count) => `${count} グループ`,
      categories: { All: 'すべて', Meals: '食事', 'School Life': '学校生活', 'Menstruation and Physical Condition': '月経・体調', Work: '仕事', Romance: '恋愛', hobby: '趣味', 'Medical Care': '医療', Other: 'その他' },
    },
    groups: {
      title: 'グループ',
      subtitle: '少人数で安心して深い会話ができる場所',
      createButton: '新しいグループを作成',
      listTitle: '参加できるグループ',
      availability: '参加受付中',
      private: '非公開',
      members: (current, capacity) => `${current} / ${capacity} 人`,
      modalTitle: '新しいグループを作成',
      closeDialog: 'グループ作成ダイアログを閉じる',
      groupNameLabel: 'グループ名 *',
      groupNamePlaceholder: '例: 20代の悩み相談ルーム',
      selectBoothLabel: 'ブースを選択 *',
      selectBoothPlaceholder: 'ブースを選んでください',
      descriptionLabel: '説明',
      descriptionPlaceholder: 'このグループの目的を説明してください。',
      maxPeopleLabel: '最大人数',
      privateOnly: '非公開グループにする（招待制）',
      submit: 'グループを作成',
      errors: { requiredName: 'グループ名は必須です。', chooseBooth: 'グループ作成前にブースを選択してください。', minCapacity: '最大人数は 2 人以上にしてください。' },
    },
    guide: {
      title: 'あなたの知識コレクション',
      subtitle: 'ログインして学んだ小さな知識が、毎日少しずつ増えていきます。',
      learnedCount: (count) => `これまでに ${count} 件の知識を集めました。`,
      announcementTitle: '大切なお知らせ',
      announcementText: 'ここにある情報は一般的な参考情報です。薬や治療法を変更する前に必ず主治医へ相談し、緊急時は速やかに医療機関を受診してください。',
      emptyTitle: 'まだトリビアはありません。',
      emptyText: '毎日ログインすると、新しい豆知識がここに追加されます。',
      hint: '明日またログインして、最初の豆知識を集めましょう。',
    },
    placeholders: {
      chat: { eyebrow: '個別チャット', title: 'コアの探索体験が整ったあとに、個別の会話機能を追加できます。', description: 'このルートは先に用意してあるため、ナビゲーションやレイアウトを崩さずに後からメッセージ機能を追加できます。' },
      myTown: { eyebrow: 'マイタウン', title: '地域コミュニティの情報を育てていくための専用ルートです。', description: '今後、地域のお知らせ、近くの支援先、場所に基づくおすすめをここに追加できます。' },
    },
    profile: {
      title: 'プロフィール設定',
      subtitle: '安心して匿名で SweetTea を利用できます。',
      nicknameLabel: 'ニックネーム',
      nicknamePlaceholder: 'お気に入りのニックネームを入力してください。',
      nicknameHelp: 'ほかのメンバーにはこの名前が表示されます。',
      ageGroupLabel: '年齢層',
      ageGroupPlaceholder: '年齢層を選択してください。',
      languageSettings: '言語設定',
      selectedLanguage: (flag, label) => `選択中の言語: ${flag} ${label}`,
      avatarColor: 'アバターカラー',
      selfIntroductionLabel: '自己紹介（任意）',
      selfIntroductionPlaceholder: 'あなたについて少し教えてください。',
      preview: 'プレビュー',
      ageGroupPending: '年齢層未設定',
      saveProfile: 'プロフィールを保存',
      previewNameFallback: 'ニックネーム',
      ageGroups: { 'Under 18': '18歳未満', '18-22': '18〜22歳', '23-29': '23〜29歳', '30-39': '30〜39歳', '40+': '40歳以上' },
    },
    errorPage: { unexpectedRouteError: '予期しないルートエラー', pageNotFound: 'ページが見つかりません', somethingWentWrong: '問題が発生しました', notFoundMessage: 'お探しのページは存在しないか、移動された可能性があります。', genericMessage: 'ページを読み込めませんでした。戻るかホームに移動してください。', goBack: '戻る', returnHome: 'ホームへ戻る', helper: '問題が続く場合はルーター設定と URL を確認してください。' },
    login: {
      badge: 'SweetTea ログイン',
      heroTitle: '次の信頼できるコミュニティの居場所を見つけましょう。',
      heroDescription: 'ログインすると、お気に入りのブース保存、地域グループへの参加、あなた向けのガイド表示ができます。',
      featureCards: [
        { title: '保存したブース', detail: '公式とコミュニティの情報を一か所にまとめられます。' },
        { title: '地域グループ', detail: '会話や集まりの場を迷わず追えます。' },
        { title: 'あなたのガイド', detail: '大切な支援ルートにすぐ戻れます。' },
      ],
      welcomeBack: 'おかえりなさい',
      signInTitle: 'SweetTea にサインイン',
      mvpPreview: 'MVP プレビュー',
      email: 'メール',
      password: 'パスワード',
      emailPlaceholder: 'you@example.com',
      passwordPlaceholder: 'パスワードを入力',
      rememberMe: 'ログイン状態を保持',
      forgotPassword: 'パスワードを忘れた場合',
      signIn: 'サインイン',
      signingIn: 'サインイン中...',
      divider: 'または次で続行',
      signUpWithEmail: 'メールアドレスで登録',
      continueWithGoogle: 'Google アカウントで続行',
      newHere: 'はじめてですか？',
      exploreApp: 'アプリを見る',
      showPassword: 'パスワードを表示',
      hidePassword: 'パスワードを隠す',
      missingCredentials: 'サインインするにはメールアドレスとパスワードの両方を入力してください。',
      unableToSignIn: '現在サインインできません。',
    },
    register: {
      badge: 'SweetTea 登録',
      heroTitle: 'SweetTea アカウントを作成しましょう。',
      heroDescription: 'メールで登録し、パスワードとプロフィールを設定すると、あなたに合ったブース、グループ、ガイドを表示できます。',
      featureCards: [
        { title: 'メール登録', detail: '自分のメールアドレスで登録し、アカウントを管理できます。' },
        { title: 'プロフィール設定', detail: '最初に基本情報を入れて、ダッシュボードをあなた向けに整えます。' },
        { title: '地域の発見', detail: '近くのコミュニティや支援先を見つけやすくします。' },
      ],
      createProfile: 'プロフィール作成',
      registerWithEmail: 'メールで登録',
      newAccount: '新規アカウント',
      firstName: '名',
      lastName: '姓',
      emailAddress: 'メールアドレス',
      sendValidationCode: '認証コードを送信',
      sending: '送信中...',
      resendValidationCode: '認証コードを再送',
      emailVerified: 'メール認証済み',
      validationCode: '認証コード',
      validationCodePlaceholder: '6桁のコードを入力',
      verifyCode: 'コードを確認',
      verifyingCode: '確認中...',
      password: 'パスワード',
      confirmPassword: 'パスワード確認',
      createPasswordPlaceholder: 'パスワードを作成',
      confirmPasswordPlaceholder: 'パスワードを再入力',
      username: 'ユーザー名',
      displayName: '表示名',
      location: '地域',
      nickname: 'ニックネーム',
      language: '言語',
      profileFocus: '利用目的',
      ageGroup: '年齢層',
      avatarColor: 'アバターカラー',
      selfIntroduction: '自己紹介',
      selfIntroductionPlaceholder: '地域の人を支えるのが好きです。',
      receiveUpdates: '新しいブース、ガイド、地域の活動について、ときどきお知らせを受け取る。',
      createAccount: 'アカウントを作成',
      creatingAccount: 'アカウント作成中...',
      divider: 'または',
      continueWithGoogle: 'Google アカウントで続行',
      alreadyRegistered: 'すでに登録済みですか？',
      signInInstead: 'サインインはこちら',
      showPassword: 'パスワードを表示',
      hidePassword: 'パスワードを隠す',
      emailCodeSent: (email) => `${email} に認証コードを送りました。6桁のコードを入力してください。`,
      emailVerifiedMessage: 'メールアドレスの確認が完了しました。アカウント作成を続けられます。',
      errors: { invalidEmail: 'コードをリクエストする前に有効なメールアドレスを入力してください。', unableToSendCode: '現在、認証コードを送信できません。', requestCodeFirst: '先に認証コードをリクエストしてください。', invalidCode: '有効な 6 桁の認証コードを入力してください。', unableToVerifyCode: '現在、コードを確認できません。', verifyEmailFirst: 'アカウント作成前にメールアドレスを確認してください。', requiredIdentity: 'ユーザー名、名、姓は必須です。', requiredPassword: 'アカウント作成前にパスワードを入力し、確認してください。', passwordMismatch: 'パスワードと確認用パスワードが一致しません。', unableToCreateAccount: '現在、アカウントを作成できません。' },
      success: { accountCreated: 'アカウントを作成しました。サインインできます。' },
      options: {
        profileFocus: ['コミュニティの支援情報を探している', '支援グループの運営を手伝っている', '支援情報と地域グループの両方を探したい'],
        ageGroups: [{ label: '成人', value: 'adult' }, { label: '10代', value: 'teen' }, { label: 'シニア', value: 'senior' }],
        avatarColors: ['ラベンダー', 'コーラル', 'スカイ', 'ミント', 'サンフラワー'],
        languageOptions: ['英語', 'スペイン語', '中国語', 'ベトナム語', 'その他'],
      },
    },
  },
  es: {
    nav: { home: 'Inicio', booths: 'Puestos', groups: 'Grupos', chat: 'Chat personal', myTown: 'Mi ciudad', guide: 'Guía', profile: 'Perfil' },
    topbar: { tagline: 'Conecta, aprende y acompaña', openNavigation: 'Abrir navegación', closeSidebar: 'Cerrar barra lateral', logout: 'Cerrar sesión', loggingOut: 'Cerrando sesión...', unableToLogout: 'No se puede cerrar sesión ahora mismo.', primaryNavigation: 'Navegación principal' },
    home: { eyebrow: 'SweetTea MVP', title: 'Una forma más cercana de encontrar puestos, grupos y apoyo local de confianza.', description: 'La primera versión se centra en descubrir rápido: una interfaz clara, categorías guiadas y una separación entre recursos oficiales y espacios comunitarios.', exploreBooths: 'Explorar puestos', mockData: 'Datos simulados listos para desarrollo UI', doneTitle: 'Criterios de entrega', doneItems: ['El entorno local funciona con Vite y rutas.', 'Los puestos se pueden filtrar por categoría.', 'Los puestos oficiales y comunitarios se muestran por separado.', 'Todas las rutas planeadas existen aunque algunas sigan vacías.'], highlights: [{ title: 'Apoyo oficial', detail: 'Puestos respaldados por la comunidad educativa para salud, guía y necesidades básicas.' }, { title: 'Energía comunitaria', detail: 'Espacios dirigidos por pares que se actualizan rápido.' }, { title: 'Descubrimiento simple', detail: 'Encuentra el espacio correcto por categoría antes de unirte.' }] },
    booths: { title: 'Lista de puestos', subtitle: 'Un lugar donde se reúnen grupos temáticos', loading: 'Cargando datos de puestos...', empty: 'Aún no hay puestos para esta categoría. Prueba otra pestaña.', officialSection: 'Puestos oficiales', communitySection: 'Puestos de la comunidad', officialBadge: 'Oficial', see: 'Ver', groupCount: (count) => `${count} grupos`, categories: { All: 'Todos', Meals: 'Comidas', 'School Life': 'Vida escolar', 'Menstruation and Physical Condition': 'Menstruación y estado físico', Work: 'Trabajo', Romance: 'Relaciones', hobby: 'Pasatiempos', 'Medical Care': 'Atención médica', Other: 'Otros' } },
    groups: { title: 'Grupos', subtitle: 'Un lugar seguro para conversaciones profundas en grupos pequeños', createButton: 'Crear un grupo nuevo', listTitle: 'Grupos en los que puedes participar', availability: 'Participación disponible', private: 'Privado', members: (current, capacity) => `${current} / ${capacity} personas`, modalTitle: 'Crear un grupo nuevo', closeDialog: 'Cerrar diálogo de creación de grupo', groupNameLabel: 'Nombre del grupo *', groupNamePlaceholder: 'Ejemplo: Espacio de apoyo para personas en sus 20', selectBoothLabel: 'Selecciona tu puesto *', selectBoothPlaceholder: 'Elige tu puesto', descriptionLabel: 'Descripción', descriptionPlaceholder: 'Describe para qué sirve este grupo.', maxPeopleLabel: 'Número máximo de personas', privateOnly: 'Crear grupo privado (solo con invitación)', submit: 'Crear grupo', errors: { requiredName: 'El nombre del grupo es obligatorio.', chooseBooth: 'Selecciona un puesto antes de crear el grupo.', minCapacity: 'La capacidad máxima debe ser al menos 2.' } },
    guide: { title: 'Tu colección de conocimientos', subtitle: 'Los pequeños datos que aprendes al iniciar sesión se acumulan cada día.', learnedCount: (count) => `${count} aprendizajes reunidos hasta ahora.`, announcementTitle: 'Avisos importantes', announcementText: 'La información aquí es de carácter general. Consulta a tu médico antes de cambiar medicación o tratamiento, y busca atención urgente en caso de emergencia.', emptyTitle: 'Todavía no hay curiosidades.', emptyText: 'Inicia sesión cada día para agregar nuevas curiosidades aquí.', hint: 'Vuelve mañana y consigue tu primera curiosidad.' },
    placeholders: { chat: { eyebrow: 'Chat personal', title: 'Las conversaciones privadas pueden añadirse después del flujo principal de descubrimiento.', description: 'La ruta ya existe para mantener estables la navegación y el diseño mientras la mensajería se añade más adelante.' }, myTown: { eyebrow: 'Mi ciudad', title: 'El contexto de la comunidad local tiene una ruta dedicada y espacio para crecer.', description: 'Más adelante esta página puede mostrar novedades del barrio, recursos cercanos y recomendaciones por ubicación.' } },
    profile: { title: 'Configuración del perfil', subtitle: 'Usa SweetTea de forma anónima con tranquilidad.', nicknameLabel: 'Apodo', nicknamePlaceholder: 'Escribe tu apodo favorito.', nicknameHelp: 'Otros miembros verán este nombre.', ageGroupLabel: 'Grupo de edad', ageGroupPlaceholder: 'Selecciona tu grupo de edad.', languageSettings: 'Idioma', selectedLanguage: (flag, label) => `Idioma seleccionado: ${flag} ${label}`, avatarColor: 'Color del avatar', selfIntroductionLabel: 'Presentación (opcional)', selfIntroductionPlaceholder: 'Cuéntanos un poco sobre ti.', preview: 'Vista previa', ageGroupPending: 'Grupo de edad pendiente', saveProfile: 'Guardar perfil', previewNameFallback: 'Apodo', ageGroups: { 'Under 18': 'Menor de 18', '18-22': '18-22', '23-29': '23-29', '30-39': '30-39', '40+': '40+' } },
    errorPage: { unexpectedRouteError: 'Error de ruta inesperado', pageNotFound: 'Página no encontrada', somethingWentWrong: 'Algo salió mal', notFoundMessage: 'La página solicitada no existe o pudo haberse movido.', genericMessage: 'No se pudo cargar la página. Intenta volver o ir al inicio.', goBack: 'Volver', returnHome: 'Ir al inicio', helper: 'Si esto sigue pasando, revisa la configuración de rutas o la URL solicitada.' },
    login: { badge: 'Acceso SweetTea', heroTitle: 'Encuentra tu próximo espacio comunitario de confianza.', heroDescription: 'Inicia sesión para guardar puestos favoritos, unirte a grupos locales y mantener tu guía adaptada a tu zona.', featureCards: [{ title: 'Puestos guardados', detail: 'Mantén recursos oficiales y comunitarios en una sola lista.' }, { title: 'Grupos locales', detail: 'Sigue conversaciones y encuentros sin buscar demasiado.' }, { title: 'Guía personal', detail: 'Vuelve a las rutas de apoyo que más te importan.' }], welcomeBack: 'Bienvenida de nuevo', signInTitle: 'Entrar en SweetTea', mvpPreview: 'Vista MVP', email: 'Correo', password: 'Contraseña', emailPlaceholder: 'you@example.com', passwordPlaceholder: 'Escribe tu contraseña', rememberMe: 'Recordarme', forgotPassword: '¿Olvidaste tu contraseña?', signIn: 'Entrar', signingIn: 'Entrando...', divider: 'o continúa con', signUpWithEmail: 'Regístrate con tu correo', continueWithGoogle: 'Continuar con Google', newHere: '¿Nueva aquí?', exploreApp: 'Explorar la app', showPassword: 'Mostrar contraseña', hidePassword: 'Ocultar contraseña', missingCredentials: 'Escribe tu correo y contraseña para entrar.', unableToSignIn: 'No se puede iniciar sesión ahora.' },
    register: { badge: 'Registro SweetTea', heroTitle: 'Crea tu cuenta de SweetTea.', heroDescription: 'Regístrate con tu correo, define tu contraseña y añade algunos datos para personalizar puestos, grupos y guías.', featureCards: [{ title: 'Acceso por correo', detail: 'Usa tu correo para registrarte y gestionar tu cuenta.' }, { title: 'Configuración del perfil', detail: 'Completa lo básico ahora para que tu panel se sienta personal desde el inicio.' }, { title: 'Descubrimiento local', detail: 'Ayuda a SweetTea a mostrar espacios y apoyos cercanos.' }], createProfile: 'Crear perfil', registerWithEmail: 'Registrarse con correo', newAccount: 'Cuenta nueva', firstName: 'Nombre', lastName: 'Apellido', emailAddress: 'Correo electrónico', sendValidationCode: 'Enviar código', sending: 'Enviando...', resendValidationCode: 'Reenviar código', emailVerified: 'Correo verificado', validationCode: 'Código de verificación', validationCodePlaceholder: 'Escribe el código de 6 dígitos', verifyCode: 'Verificar código', verifyingCode: 'Verificando...', password: 'Contraseña', confirmPassword: 'Confirmar contraseña', createPasswordPlaceholder: 'Crea una contraseña', confirmPasswordPlaceholder: 'Repite tu contraseña', username: 'Usuario', displayName: 'Nombre visible', location: 'Ubicación', nickname: 'Apodo', language: 'Idioma', profileFocus: 'Enfoque del perfil', ageGroup: 'Grupo de edad', avatarColor: 'Color del avatar', selfIntroduction: 'Presentación personal', selfIntroductionPlaceholder: 'Me gusta ayudar a mi comunidad.', receiveUpdates: 'Envíenme actualizaciones ocasionales sobre nuevos puestos, guías y actividades comunitarias de mi zona.', createAccount: 'Crear cuenta', creatingAccount: 'Creando cuenta...', divider: 'o', continueWithGoogle: 'Continuar con Google', alreadyRegistered: '¿Ya estás registrada?', signInInstead: 'Entrar en su lugar', showPassword: 'Mostrar contraseña', hidePassword: 'Ocultar contraseña', emailCodeSent: (email) => `Se envió un código a ${email}. Ingresa los 6 dígitos para continuar.`, emailVerifiedMessage: 'El correo fue verificado. Ya puedes terminar de crear tu cuenta.', errors: { invalidEmail: 'Escribe un correo válido antes de solicitar un código.', unableToSendCode: 'No se puede enviar el código ahora.', requestCodeFirst: 'Solicita primero un código.', invalidCode: 'Escribe un código válido de 6 dígitos.', unableToVerifyCode: 'No se puede verificar el código ahora.', verifyEmailFirst: 'Verifica tu correo antes de crear la cuenta.', requiredIdentity: 'Usuario, nombre y apellido son obligatorios.', requiredPassword: 'Escribe y confirma tu contraseña antes de crear la cuenta.', passwordMismatch: 'La contraseña y su confirmación deben coincidir.', unableToCreateAccount: 'No se puede crear la cuenta ahora.' }, success: { accountCreated: 'Cuenta creada correctamente. Ya puedes iniciar sesión.' }, options: { profileFocus: ['Estoy buscando recursos comunitarios', 'Ayudo a organizar grupos de apoyo', 'Quiero recursos y grupos locales'], ageGroups: [{ label: 'Adulta', value: 'adult' }, { label: 'Adolescente', value: 'teen' }, { label: 'Persona mayor', value: 'senior' }], avatarColors: ['Lavanda', 'Coral', 'Cielo', 'Menta', 'Girasol'], languageOptions: ['Inglés', 'Español', 'Chino', 'Vietnamita', 'Otro'] } },
  },
  hi: {
    nav: { home: 'होम', booths: 'बूथ', groups: 'समूह', chat: 'निजी चैट', myTown: 'मेरा शहर', guide: 'गाइड', profile: 'प्रोफ़ाइल' },
    topbar: { tagline: 'जुड़ें, सीखें और साथ बढ़ें', openNavigation: 'नेविगेशन खोलें', closeSidebar: 'साइडबार बंद करें', logout: 'लॉग आउट', loggingOut: 'लॉग आउट हो रहा है...', unableToLogout: 'अभी लॉग आउट नहीं किया जा सकता।', primaryNavigation: 'मुख्य नेविगेशन' },
    home: { eyebrow: 'SweetTea MVP', title: 'विश्वसनीय बूथ, समूह और स्थानीय सहायता खोजने का एक गर्मजोशी भरा तरीका।', description: 'पहला रिलीज़ तेज़ खोज पर केंद्रित है: साफ़ ऐप शेल, निर्देशित श्रेणियां, और आधिकारिक व सामुदायिक स्थानों का स्पष्ट विभाजन।', exploreBooths: 'बूथ देखें', mockData: 'UI विकास के लिए मॉक डेटा तैयार', doneTitle: 'पूर्णता की शर्तें', doneItems: ['Vite और राउटेड ऐप स्थानीय रूप से चलता है।', 'बूथ श्रेणी के अनुसार फ़िल्टर हो सकते हैं।', 'आधिकारिक और सामुदायिक बूथ अलग-अलग दिखते हैं।', 'सभी नियोजित रूट मौजूद हैं, भले कुछ पेज अभी खाली हों।'], highlights: [{ title: 'आधिकारिक सहायता', detail: 'ज़रूरी, स्वास्थ्य और मार्गदर्शन के लिए भरोसेमंद बूथ।' }, { title: 'समुदाय की ऊर्जा', detail: 'साथियों द्वारा चलाए जाने वाले कमरे और विषय समूह।' }, { title: 'आसान खोज', detail: 'समूह में शामिल होने से पहले श्रेणी से सही जगह खोजें।' }] },
    booths: { title: 'बूथ सूची', subtitle: 'जहाँ विषय-आधारित समूह इकट्ठा होते हैं', loading: 'बूथ डेटा लोड हो रहा है...', empty: 'इस श्रेणी के लिए अभी कोई बूथ नहीं है। दूसरी टैब आज़माएँ।', officialSection: 'आधिकारिक बूथ', communitySection: 'सामुदायिक बूथ', officialBadge: 'आधिकारिक', see: 'देखें', groupCount: (count) => `${count} समूह`, categories: { All: 'सभी', Meals: 'भोजन', 'School Life': 'स्कूल जीवन', 'Menstruation and Physical Condition': 'मासिक धर्म और शारीरिक स्थिति', Work: 'काम', Romance: 'संबंध', hobby: 'शौक', 'Medical Care': 'चिकित्सा', Other: 'अन्य' } },
    groups: { title: 'समूह', subtitle: 'छोटे समूह में गहरी बातचीत के लिए सुरक्षित जगह', createButton: 'नया समूह बनाएँ', listTitle: 'वे समूह जिनमें आप शामिल हो सकते हैं', availability: 'भागीदारी उपलब्ध', private: 'निजी', members: (current, capacity) => `${current} / ${capacity} लोग`, modalTitle: 'नया समूह बनाएँ', closeDialog: 'समूह बनाने का संवाद बंद करें', groupNameLabel: 'समूह का नाम *', groupNamePlaceholder: 'उदाहरण: 20s सपोर्ट रूम', selectBoothLabel: 'अपना बूथ चुनें *', selectBoothPlaceholder: 'कृपया बूथ चुनें', descriptionLabel: 'विवरण', descriptionPlaceholder: 'बताएँ यह समूह किसलिए है।', maxPeopleLabel: 'अधिकतम लोगों की संख्या', privateOnly: 'निजी समूह बनाएँ (केवल आमंत्रण)', submit: 'समूह बनाएँ', errors: { requiredName: 'समूह का नाम आवश्यक है।', chooseBooth: 'समूह बनाने से पहले बूथ चुनें।', minCapacity: 'अधिकतम क्षमता कम से कम 2 होनी चाहिए।' } },
    guide: { title: 'आपका ज्ञान संग्रह', subtitle: 'लॉग इन करते समय सीखी गई छोटी बातें हर दिन जुड़ती जाती हैं।', learnedCount: (count) => `अब तक ${count} ज्ञान बिंदु एकत्र किए गए हैं।`, announcementTitle: 'महत्वपूर्ण घोषणाएँ', announcementText: 'यह जानकारी सामान्य ज्ञान के रूप में दी गई है। दवा या उपचार बदलने से पहले डॉक्टर से सलाह लें और आपातकाल में तुरंत चिकित्सा सहायता लें।', emptyTitle: 'अभी कोई जानकारी नहीं।', emptyText: 'हर दिन लॉग इन करें और यहाँ नई जानकारी पाएँ।', hint: 'कल फिर लॉग इन करें और अपनी पहली जानकारी जुटाएँ।' },
    placeholders: { chat: { eyebrow: 'निजी चैट', title: 'मुख्य खोज अनुभव तैयार होने के बाद निजी बातचीत जोड़ी जा सकती है।', description: 'यह रूट अभी मौजूद है ताकि बाद में मैसेजिंग जोड़ते समय लेआउट स्थिर रहे।' }, myTown: { eyebrow: 'मेरा शहर', title: 'स्थानीय समुदाय संदर्भ के लिए समर्पित रूट तैयार है।', description: 'बाद में यहाँ आसपास के संसाधन, अपडेट और स्थान-आधारित सुझाव जोड़े जा सकते हैं।' } },
    profile: { title: 'प्रोफ़ाइल सेटिंग्स', subtitle: 'SweetTea को गुमनाम रूप से निश्चिंत होकर उपयोग करें।', nicknameLabel: 'निकनेम', nicknamePlaceholder: 'अपना पसंदीदा निकनेम लिखें।', nicknameHelp: 'अन्य सदस्य यही नाम देखेंगे।', ageGroupLabel: 'आयु वर्ग', ageGroupPlaceholder: 'अपना आयु वर्ग चुनें।', languageSettings: 'भाषा सेटिंग्स', selectedLanguage: (flag, label) => `चयनित भाषा: ${flag} ${label}`, avatarColor: 'अवतार रंग', selfIntroductionLabel: 'स्व-परिचय (वैकल्पिक)', selfIntroductionPlaceholder: 'अपने बारे में थोड़ा बताइए।', preview: 'पूर्वावलोकन', ageGroupPending: 'आयु वर्ग लंबित', saveProfile: 'प्रोफ़ाइल सहेजें', previewNameFallback: 'निकनेम', ageGroups: { 'Under 18': '18 से कम', '18-22': '18-22', '23-29': '23-29', '30-39': '30-39', '40+': '40+' } },
    errorPage: { unexpectedRouteError: 'अनपेक्षित रूट त्रुटि', pageNotFound: 'पेज नहीं मिला', somethingWentWrong: 'कुछ गलत हुआ', notFoundMessage: 'अनुरोधित पेज मौजूद नहीं है या उसे स्थानांतरित किया गया हो सकता है।', genericMessage: 'पेज लोड नहीं हो सका। वापस जाएँ या होम पर लौटें।', goBack: 'वापस जाएँ', returnHome: 'होम पर लौटें', helper: 'यदि यह समस्या बनी रहे, तो राउटर कॉन्फ़िगरेशन या URL जाँचें।' },
    login: { badge: 'SweetTea लॉगिन', heroTitle: 'अपना अगला भरोसेमंद सामुदायिक स्थान खोजें।', heroDescription: 'साइन इन करें ताकि पसंदीदा बूथ सहेज सकें, स्थानीय समूहों से जुड़ सकें और अपनी गाइड को अपनी ज़रूरतों के अनुसार रख सकें।', featureCards: [{ title: 'सहेजे गए बूथ', detail: 'आधिकारिक और सामुदायिक संसाधनों को एक सूची में रखें।' }, { title: 'स्थानीय समूह', detail: 'बिना ज़्यादा खोजे बातचीत और मिलने की जगहों को ट्रैक करें।' }, { title: 'व्यक्तिगत गाइड', detail: 'उन सहायता मार्गों पर वापस जाएँ जो आपके लिए मायने रखते हैं।' }], welcomeBack: 'फिर से स्वागत है', signInTitle: 'SweetTea में साइन इन करें', mvpPreview: 'MVP प्रीव्यू', email: 'ईमेल', password: 'पासवर्ड', emailPlaceholder: 'you@example.com', passwordPlaceholder: 'अपना पासवर्ड दर्ज करें', rememberMe: 'मुझे याद रखें', forgotPassword: 'पासवर्ड भूल गए?', signIn: 'साइन इन', signingIn: 'साइन इन हो रहा है...', divider: 'या इसके साथ जारी रखें', signUpWithEmail: 'ईमेल से साइन अप करें', continueWithGoogle: 'Google खाते से जारी रखें', newHere: 'नए हैं?', exploreApp: 'ऐप देखें', showPassword: 'पासवर्ड दिखाएँ', hidePassword: 'पासवर्ड छिपाएँ', missingCredentials: 'साइन इन करने के लिए ईमेल और पासवर्ड दोनों दर्ज करें।', unableToSignIn: 'अभी साइन इन नहीं किया जा सकता।' },
    register: { badge: 'SweetTea पंजीकरण', heroTitle: 'अपना SweetTea खाता बनाएँ।', heroDescription: 'ईमेल से पंजीकरण करें, पासवर्ड सेट करें और कुछ प्रोफ़ाइल जानकारी जोड़ें ताकि ऐप आपको उपयुक्त बूथ, समूह और गाइड दिखा सके।', featureCards: [{ title: 'ईमेल आधारित पहुँच', detail: 'अपने ईमेल से साइन अप करें और खाते का प्रबंधन करें।' }, { title: 'प्रोफ़ाइल सेटअप', detail: 'शुरुआत में बुनियादी जानकारी जोड़ें ताकि डैशबोर्ड व्यक्तिगत लगे।' }, { title: 'स्थानीय खोज', detail: 'SweetTea को आसपास के सामुदायिक स्थान और सहायता संसाधन दिखाने में मदद करें।' }], createProfile: 'प्रोफ़ाइल बनाएँ', registerWithEmail: 'ईमेल से पंजीकरण', newAccount: 'नया खाता', firstName: 'पहला नाम', lastName: 'अंतिम नाम', emailAddress: 'ईमेल पता', sendValidationCode: 'सत्यापन कोड भेजें', sending: 'भेजा जा रहा है...', resendValidationCode: 'कोड फिर भेजें', emailVerified: 'ईमेल सत्यापित', validationCode: 'सत्यापन कोड', validationCodePlaceholder: '6 अंकों का कोड दर्ज करें', verifyCode: 'कोड सत्यापित करें', verifyingCode: 'सत्यापित हो रहा है...', password: 'पासवर्ड', confirmPassword: 'पासवर्ड की पुष्टि', createPasswordPlaceholder: 'पासवर्ड बनाएँ', confirmPasswordPlaceholder: 'पासवर्ड फिर से लिखें', username: 'यूज़रनेम', displayName: 'डिस्प्ले नाम', location: 'स्थान', nickname: 'निकनेम', language: 'भाषा', profileFocus: 'प्रोफ़ाइल उद्देश्य', ageGroup: 'आयु वर्ग', avatarColor: 'अवतार रंग', selfIntroduction: 'स्व-परिचय', selfIntroductionPlaceholder: 'मुझे अपने समुदाय की मदद करना पसंद है।', receiveUpdates: 'मेरे क्षेत्र में नए बूथ, गाइड और सामुदायिक गतिविधियों के बारे में कभी-कभार अपडेट भेजें।', createAccount: 'खाता बनाएँ', creatingAccount: 'खाता बनाया जा रहा है...', divider: 'या', continueWithGoogle: 'Google खाते से जारी रखें', alreadyRegistered: 'पहले से पंजीकृत हैं?', signInInstead: 'इसके बजाय साइन इन करें', showPassword: 'पासवर्ड दिखाएँ', hidePassword: 'पासवर्ड छिपाएँ', emailCodeSent: (email) => `${email} पर सत्यापन कोड भेजा गया। आगे बढ़ने के लिए 6 अंकों का कोड दर्ज करें।`, emailVerifiedMessage: 'ईमेल सत्यापित हो गया। अब आप खाता बनाना पूरा कर सकते हैं।', errors: { invalidEmail: 'कोड माँगने से पहले वैध ईमेल दर्ज करें।', unableToSendCode: 'अभी कोड नहीं भेजा जा सकता।', requestCodeFirst: 'पहले सत्यापन कोड माँगें।', invalidCode: 'वैध 6 अंकों का कोड दर्ज करें।', unableToVerifyCode: 'अभी कोड सत्यापित नहीं किया जा सकता।', verifyEmailFirst: 'खाता बनाने से पहले ईमेल सत्यापित करें।', requiredIdentity: 'यूज़रनेम, पहला नाम और अंतिम नाम आवश्यक हैं।', requiredPassword: 'खाता बनाने से पहले पासवर्ड दर्ज करें और पुष्टि करें।', passwordMismatch: 'पासवर्ड और पुष्टि मेल खाने चाहिए।', unableToCreateAccount: 'अभी खाता नहीं बनाया जा सकता।' }, success: { accountCreated: 'खाता सफलतापूर्वक बन गया। अब आप साइन इन कर सकते हैं।' }, options: { profileFocus: ['मैं सामुदायिक संसाधन खोज रहा/रही हूँ', 'मैं सहायता समूह आयोजित करने में मदद करता/करती हूँ', 'मुझे संसाधन और स्थानीय समूह दोनों चाहिए'], ageGroups: [{ label: 'वयस्क', value: 'adult' }, { label: 'किशोर', value: 'teen' }, { label: 'वरिष्ठ', value: 'senior' }], avatarColors: ['लैवेंडर', 'कोरल', 'स्काई', 'मिंट', 'सनफ्लावर'], languageOptions: ['अंग्रेज़ी', 'स्पेनिश', 'चीनी', 'वियतनामी', 'अन्य'] } },
  },
  zh: {
    nav: { home: '首页', booths: '展位', groups: '群组', chat: '私聊', myTown: '我的社区', guide: '指南', profile: '个人资料' },
    topbar: { tagline: '连接、学习、彼此支持', openNavigation: '打开导航', closeSidebar: '关闭侧边栏', logout: '退出登录', loggingOut: '正在退出...', unableToLogout: '暂时无法退出登录。', primaryNavigation: '主导航' },
    home: { eyebrow: 'SweetTea MVP', title: '更温暖地找到值得信赖的展位、群组和本地支持。', description: '首个版本聚焦于快速发现：清晰的应用骨架、引导式分类，以及官方资源与社区空间的明确区分。', exploreBooths: '查看展位', mockData: '已准备好用于 UI 开发的模拟数据', doneTitle: '完成标准', doneItems: ['本地开发可通过 Vite 和路由外壳运行。', '展位可以按类别筛选。', '官方展位和社区展位分区显示。', '即使内容仍是占位，所有规划路由也已存在。'], highlights: [{ title: '官方支持', detail: '为基础需求、健康和指引提供可信的官方展位。' }, { title: '社区活力', detail: '由同伴主导的房间和主题空间更新迅速。' }, { title: '轻松发现', detail: '加入群组前先按类别找到合适空间。' }] },
    booths: { title: '展位列表', subtitle: '按主题聚集群组的地方', loading: '正在加载展位数据...', empty: '这个分类下暂时没有展位，试试其他标签。', officialSection: '官方展位', communitySection: '社区展位', officialBadge: '官方', see: '查看', groupCount: (count) => `${count} 个群组`, categories: { All: '全部', Meals: '饮食', 'School Life': '校园生活', 'Menstruation and Physical Condition': '经期与身体状况', Work: '工作', Romance: '恋爱', hobby: '兴趣', 'Medical Care': '医疗', Other: '其他' } },
    groups: { title: '群组', subtitle: '适合小范围深入交流的安全空间', createButton: '创建新群组', listTitle: '你可以参加的群组', availability: '可加入', private: '私密', members: (current, capacity) => `${current} / ${capacity} 人`, modalTitle: '创建新群组', closeDialog: '关闭创建群组对话框', groupNameLabel: '群组名称 *', groupNamePlaceholder: '例如：20 多岁支持交流室', selectBoothLabel: '选择展位 *', selectBoothPlaceholder: '请选择展位', descriptionLabel: '描述', descriptionPlaceholder: '介绍这个群组的用途。', maxPeopleLabel: '人数上限', privateOnly: '创建私密群组（仅限邀请）', submit: '创建群组', errors: { requiredName: '群组名称是必填项。', chooseBooth: '创建群组前请先选择展位。', minCapacity: '人数上限至少为 2。' } },
    guide: { title: '你的知识收藏', subtitle: '每次登录学到的小知识，都会一点点积累起来。', learnedCount: (count) => `目前已收集 ${count} 条知识。`, announcementTitle: '重要公告', announcementText: '这里的信息仅供一般参考。调整药物或治疗方式前请咨询医生，如有紧急情况请及时就医。', emptyTitle: '还没有小知识。', emptyText: '每天登录，这里都会增加新的小知识。', hint: '明天再来登录，收集你的第一条小知识吧。' },
    placeholders: { chat: { eyebrow: '私聊', title: '在核心发现流程稳定后，再加入私聊功能。', description: '这个路由已经预留好，之后新增消息、未读状态和会话存储时无需重做整体布局。' }, myTown: { eyebrow: '我的社区', title: '这里为本地社区内容预留了独立空间。', description: '以后可以在这里加入社区动态、附近资源和基于地点的推荐。' } },
    profile: { title: '个人资料设置', subtitle: '安心地以匿名方式使用 SweetTea。', nicknameLabel: '昵称', nicknamePlaceholder: '请输入你喜欢的昵称。', nicknameHelp: '其他成员会看到这个名字。', ageGroupLabel: '年龄段', ageGroupPlaceholder: '请选择年龄段。', languageSettings: '语言设置', selectedLanguage: (flag, label) => `当前语言：${flag} ${label}`, avatarColor: '头像颜色', selfIntroductionLabel: '自我介绍（可选）', selfIntroductionPlaceholder: '简单介绍一下自己。', preview: '预览', ageGroupPending: '年龄段待填写', saveProfile: '保存资料', previewNameFallback: '昵称', ageGroups: { 'Under 18': '18岁以下', '18-22': '18-22岁', '23-29': '23-29岁', '30-39': '30-39岁', '40+': '40岁以上' } },
    errorPage: { unexpectedRouteError: '意外的路由错误', pageNotFound: '页面未找到', somethingWentWrong: '出了点问题', notFoundMessage: '你请求的页面不存在，或者已被移动。', genericMessage: '页面无法加载。请返回上一页或回到首页。', goBack: '返回', returnHome: '回到首页', helper: '如果问题持续出现，请检查路由配置或确认 URL 是否正确。' },
    login: { badge: 'SweetTea 登录', heroTitle: '找到下一个值得信赖的社区空间。', heroDescription: '登录后可保存喜欢的展位、加入本地群组，并让指南更贴合你的需求。', featureCards: [{ title: '已保存展位', detail: '把官方和社区资源放在同一份清单里。' }, { title: '本地群组', detail: '轻松追踪对话和线下聚会空间。' }, { title: '个人指南', detail: '快速回到你最关心的支持路径。' }], welcomeBack: '欢迎回来', signInTitle: '登录 SweetTea', mvpPreview: 'MVP 预览', email: '邮箱', password: '密码', emailPlaceholder: 'you@example.com', passwordPlaceholder: '输入密码', rememberMe: '记住我', forgotPassword: '忘记密码？', signIn: '登录', signingIn: '登录中...', divider: '或使用以下方式继续', signUpWithEmail: '使用邮箱注册', continueWithGoogle: '使用 Google 账号继续', newHere: '第一次来？', exploreApp: '浏览应用', showPassword: '显示密码', hidePassword: '隐藏密码', missingCredentials: '请输入邮箱和密码后再登录。', unableToSignIn: '暂时无法登录。' },
    register: { badge: 'SweetTea 注册', heroTitle: '创建你的 SweetTea 账号。', heroDescription: '使用邮箱注册、设置密码并补充一些资料，这样应用就能为你推荐更合适的展位、群组和指南。', featureCards: [{ title: '邮箱访问', detail: '用自己的邮箱注册并管理账号。' }, { title: '资料设置', detail: '现在先填好基础信息，让首页从一开始就更贴近你。' }, { title: '本地发现', detail: '帮助 SweetTea 展示附近的社区空间和支持资源。' }], createProfile: '创建资料', registerWithEmail: '邮箱注册', newAccount: '新账号', firstName: '名', lastName: '姓', emailAddress: '邮箱地址', sendValidationCode: '发送验证码', sending: '发送中...', resendValidationCode: '重新发送验证码', emailVerified: '邮箱已验证', validationCode: '验证码', validationCodePlaceholder: '输入 6 位验证码', verifyCode: '验证验证码', verifyingCode: '验证中...', password: '密码', confirmPassword: '确认密码', createPasswordPlaceholder: '创建密码', confirmPasswordPlaceholder: '再次输入密码', username: '用户名', displayName: '显示名称', location: '所在地', nickname: '昵称', language: '语言', profileFocus: '关注方向', ageGroup: '年龄段', avatarColor: '头像颜色', selfIntroduction: '自我介绍', selfIntroductionPlaceholder: '我喜欢帮助我的社区。', receiveUpdates: '偶尔向我发送有关新展位、指南和社区活动的更新。', createAccount: '创建账号', creatingAccount: '正在创建账号...', divider: '或', continueWithGoogle: '使用 Google 账号继续', alreadyRegistered: '已经注册？', signInInstead: '改为登录', showPassword: '显示密码', hidePassword: '隐藏密码', emailCodeSent: (email) => `验证码已发送到 ${email}。请输入 6 位验证码继续。`, emailVerifiedMessage: '邮箱验证完成，你可以继续创建账号。', errors: { invalidEmail: '请求验证码前请先输入有效邮箱。', unableToSendCode: '暂时无法发送验证码。', requestCodeFirst: '请先请求验证码。', invalidCode: '请输入有效的 6 位验证码。', unableToVerifyCode: '暂时无法验证验证码。', verifyEmailFirst: '创建账号前请先验证邮箱。', requiredIdentity: '用户名、名字和姓氏为必填项。', requiredPassword: '创建账号前请输入并确认密码。', passwordMismatch: '密码和确认密码必须一致。', unableToCreateAccount: '暂时无法创建账号。' }, success: { accountCreated: '账号创建成功，现在可以登录。' }, options: { profileFocus: ['我在寻找社区资源', '我在帮助组织支持群组', '我希望同时获取资源和本地群组'], ageGroups: [{ label: '成人', value: 'adult' }, { label: '青少年', value: 'teen' }, { label: '长者', value: 'senior' }], avatarColors: ['薰衣草', '珊瑚', '天空蓝', '薄荷', '向日葵'], languageOptions: ['英语', '西班牙语', '中文', '越南语', '其他'] } },
  },
  fr: {
    nav: { home: 'Accueil', booths: 'Stands', groups: 'Groupes', chat: 'Chat privé', myTown: 'Ma ville', guide: 'Guide', profile: 'Profil' },
    topbar: { tagline: 'Se connecter, apprendre et s’entraider', openNavigation: 'Ouvrir la navigation', closeSidebar: 'Fermer la barre latérale', logout: 'Se déconnecter', loggingOut: 'Déconnexion...', unableToLogout: 'Impossible de se déconnecter pour le moment.', primaryNavigation: 'Navigation principale' },
    home: { eyebrow: 'SweetTea MVP', title: 'Une façon plus chaleureuse de trouver des stands, des groupes et du soutien local de confiance.', description: 'La première version se concentre sur une découverte rapide : une interface claire, des catégories guidées et une séparation nette entre ressources officielles et espaces communautaires.', exploreBooths: 'Explorer les stands', mockData: 'Données fictives prêtes pour le développement UI', doneTitle: 'Définition de terminé', doneItems: ['Le développement local fonctionne avec Vite et le shell routé.', 'Les stands peuvent être filtrés par catégorie.', 'Les stands officiels et communautaires sont séparés.', 'Toutes les routes prévues existent, même si certaines pages sont encore vides.'], highlights: [{ title: 'Soutien officiel', detail: 'Des stands de confiance pour la santé, les essentiels et l’orientation.' }, { title: 'Énergie communautaire', detail: 'Des espaces menés par les pairs qui évoluent vite.' }, { title: 'Découverte fluide', detail: 'Trouvez le bon espace par catégorie avant de rejoindre un groupe.' }] },
    booths: { title: 'Liste des stands', subtitle: 'Un lieu où se retrouvent des groupes thématiques', loading: 'Chargement des stands...', empty: 'Aucun stand ne correspond encore à cette catégorie. Essayez un autre onglet.', officialSection: 'Stands officiels', communitySection: 'Stands communautaires', officialBadge: 'Officiel', see: 'Voir', groupCount: (count) => `${count} groupes`, categories: { All: 'Tous', Meals: 'Repas', 'School Life': 'Vie scolaire', 'Menstruation and Physical Condition': 'Menstruations et état physique', Work: 'Travail', Romance: 'Relations', hobby: 'Loisirs', 'Medical Care': 'Soins médicaux', Other: 'Autres' } },
    groups: { title: 'Groupes', subtitle: 'Un espace sûr pour des conversations profondes en petit comité', createButton: 'Créer un nouveau groupe', listTitle: 'Groupes auxquels vous pouvez participer', availability: 'Participation ouverte', private: 'Privé', members: (current, capacity) => `${current} / ${capacity} personnes`, modalTitle: 'Créer un nouveau groupe', closeDialog: 'Fermer la fenêtre de création', groupNameLabel: 'Nom du groupe *', groupNamePlaceholder: 'Exemple : Salon de soutien pour les 20 ans', selectBoothLabel: 'Choisissez votre stand *', selectBoothPlaceholder: 'Veuillez choisir un stand', descriptionLabel: 'Description', descriptionPlaceholder: 'Décrivez l’objectif de ce groupe.', maxPeopleLabel: 'Nombre maximal de personnes', privateOnly: 'Créer un groupe privé (sur invitation)', submit: 'Créer le groupe', errors: { requiredName: 'Le nom du groupe est obligatoire.', chooseBooth: 'Choisissez un stand avant de créer un groupe.', minCapacity: 'La capacité maximale doit être d’au moins 2.' } },
    guide: { title: 'Votre collection de connaissances', subtitle: 'Les petites choses apprises en se connectant s’accumulent chaque jour.', learnedCount: (count) => `${count} connaissances collectées jusqu’ici.`, announcementTitle: 'Annonces importantes', announcementText: 'Les informations ici sont générales. Consultez votre médecin avant de modifier un traitement et cherchez rapidement une aide médicale en cas d’urgence.', emptyTitle: 'Pas encore de conseils.', emptyText: 'Connectez-vous chaque jour pour ajouter de nouveaux conseils ici.', hint: 'Revenez demain pour collecter votre premier conseil.' },
    placeholders: { chat: { eyebrow: 'Chat privé', title: 'Les conversations privées peuvent être ajoutées après le flux principal de découverte.', description: 'La route existe déjà pour garder une navigation et une mise en page stables pendant l’ajout futur de la messagerie.' }, myTown: { eyebrow: 'Ma ville', title: 'Le contexte local dispose d’une route dédiée prête à évoluer.', description: 'Cette page pourra plus tard afficher les actualités du quartier, les ressources proches et des recommandations locales.' } },
    profile: { title: 'Paramètres du profil', subtitle: 'Utilisez SweetTea anonymement en toute tranquillité.', nicknameLabel: 'Surnom', nicknamePlaceholder: 'Entrez votre surnom préféré.', nicknameHelp: 'Les autres membres verront ce nom.', ageGroupLabel: 'Tranche d’âge', ageGroupPlaceholder: 'Sélectionnez votre tranche d’âge.', languageSettings: 'Paramètres de langue', selectedLanguage: (flag, label) => `Langue sélectionnée : ${flag} ${label}`, avatarColor: 'Couleur de l’avatar', selfIntroductionLabel: 'Présentation (optionnelle)', selfIntroductionPlaceholder: 'Parlez-nous un peu de vous.', preview: 'Aperçu', ageGroupPending: 'Tranche d’âge en attente', saveProfile: 'Enregistrer le profil', previewNameFallback: 'Surnom', ageGroups: { 'Under 18': 'Moins de 18 ans', '18-22': '18-22', '23-29': '23-29', '30-39': '30-39', '40+': '40+' } },
    errorPage: { unexpectedRouteError: 'Erreur de route inattendue', pageNotFound: 'Page introuvable', somethingWentWrong: 'Un problème est survenu', notFoundMessage: 'La page demandée n’existe pas ou a peut-être été déplacée.', genericMessage: 'La page n’a pas pu être chargée. Revenez en arrière ou retournez à l’accueil.', goBack: 'Retour', returnHome: 'Retour à l’accueil', helper: 'Si le problème persiste, vérifiez la configuration du routeur ou l’URL demandée.' },
    login: { badge: 'Connexion SweetTea', heroTitle: 'Trouvez votre prochain espace communautaire de confiance.', heroDescription: 'Connectez-vous pour enregistrer vos stands favoris, rejoindre des groupes locaux et garder un guide adapté à ce qui compte pour vous.', featureCards: [{ title: 'Stands enregistrés', detail: 'Gardez les ressources officielles et communautaires dans une seule liste.' }, { title: 'Groupes locaux', detail: 'Suivez les conversations et les rencontres sans chercher partout.' }, { title: 'Guide personnel', detail: 'Retrouvez rapidement les parcours de soutien qui vous importent.' }], welcomeBack: 'Bon retour', signInTitle: 'Se connecter à SweetTea', mvpPreview: 'Aperçu MVP', email: 'E-mail', password: 'Mot de passe', emailPlaceholder: 'you@example.com', passwordPlaceholder: 'Entrez votre mot de passe', rememberMe: 'Se souvenir de moi', forgotPassword: 'Mot de passe oublié ?', signIn: 'Se connecter', signingIn: 'Connexion...', divider: 'ou continuer avec', signUpWithEmail: 'Créer un compte avec votre e-mail', continueWithGoogle: 'Continuer avec Google', newHere: 'Nouveau ici ?', exploreApp: 'Explorer l’app', showPassword: 'Afficher le mot de passe', hidePassword: 'Masquer le mot de passe', missingCredentials: 'Entrez votre e-mail et votre mot de passe pour vous connecter.', unableToSignIn: 'Impossible de se connecter pour le moment.' },
    register: { badge: 'Inscription SweetTea', heroTitle: 'Créez votre compte SweetTea.', heroDescription: 'Inscrivez-vous avec votre e-mail, définissez un mot de passe et ajoutez quelques détails pour personnaliser stands, groupes et recommandations.', featureCards: [{ title: 'Accès par e-mail', detail: 'Utilisez votre adresse e-mail pour vous inscrire et gérer votre compte.' }, { title: 'Configuration du profil', detail: 'Ajoutez l’essentiel maintenant pour un tableau de bord personnel dès le départ.' }, { title: 'Découverte locale', detail: 'Aidez SweetTea à mettre en avant des espaces communautaires et ressources proches.' }], createProfile: 'Créer le profil', registerWithEmail: 'Inscription par e-mail', newAccount: 'Nouveau compte', firstName: 'Prénom', lastName: 'Nom', emailAddress: 'Adresse e-mail', sendValidationCode: 'Envoyer le code', sending: 'Envoi...', resendValidationCode: 'Renvoyer le code', emailVerified: 'E-mail vérifié', validationCode: 'Code de vérification', validationCodePlaceholder: 'Entrez le code à 6 chiffres', verifyCode: 'Vérifier le code', verifyingCode: 'Vérification...', password: 'Mot de passe', confirmPassword: 'Confirmer le mot de passe', createPasswordPlaceholder: 'Créez un mot de passe', confirmPasswordPlaceholder: 'Répétez votre mot de passe', username: 'Nom d’utilisateur', displayName: 'Nom affiché', location: 'Lieu', nickname: 'Surnom', language: 'Langue', profileFocus: 'Objectif du profil', ageGroup: 'Tranche d’âge', avatarColor: 'Couleur de l’avatar', selfIntroduction: 'Présentation', selfIntroductionPlaceholder: 'J’aime aider ma communauté.', receiveUpdates: 'Envoyez-moi occasionnellement des nouvelles sur les nouveaux stands, guides et activités communautaires autour de moi.', createAccount: 'Créer le compte', creatingAccount: 'Création du compte...', divider: 'ou', continueWithGoogle: 'Continuer avec Google', alreadyRegistered: 'Déjà inscrit ?', signInInstead: 'Se connecter à la place', showPassword: 'Afficher le mot de passe', hidePassword: 'Masquer le mot de passe', emailCodeSent: (email) => `Un code a été envoyé à ${email}. Entrez les 6 chiffres pour continuer.`, emailVerifiedMessage: 'Adresse e-mail vérifiée. Vous pouvez terminer la création du compte.', errors: { invalidEmail: 'Entrez une adresse e-mail valide avant de demander un code.', unableToSendCode: 'Impossible d’envoyer un code pour le moment.', requestCodeFirst: 'Demandez d’abord un code de vérification.', invalidCode: 'Entrez un code valide à 6 chiffres.', unableToVerifyCode: 'Impossible de vérifier le code pour le moment.', verifyEmailFirst: 'Vérifiez votre adresse e-mail avant de créer votre compte.', requiredIdentity: 'Le nom d’utilisateur, le prénom et le nom sont obligatoires.', requiredPassword: 'Entrez et confirmez votre mot de passe avant de créer votre compte.', passwordMismatch: 'Le mot de passe et sa confirmation doivent correspondre.', unableToCreateAccount: 'Impossible de créer votre compte pour le moment.' }, success: { accountCreated: 'Compte créé avec succès. Vous pouvez maintenant vous connecter.' }, options: { profileFocus: ['Je cherche des ressources communautaires', 'J’aide à organiser des groupes de soutien', 'Je veux à la fois des ressources et des groupes locaux'], ageGroups: [{ label: 'Adulte', value: 'adult' }, { label: 'Adolescent', value: 'teen' }, { label: 'Senior', value: 'senior' }], avatarColors: ['Lavande', 'Corail', 'Ciel', 'Menthe', 'Tournesol'], languageOptions: ['Anglais', 'Espagnol', 'Chinois', 'Vietnamien', 'Autre'] } },
  },
  ar: {
    nav: { home: 'الرئيسية', booths: 'الأكشاك', groups: 'المجموعات', chat: 'دردشة خاصة', myTown: 'مدينتي', guide: 'الدليل', profile: 'الملف الشخصي' },
    topbar: { tagline: 'تواصلي وتعلّمي وازدهري', openNavigation: 'افتحي التنقل', closeSidebar: 'أغلقي الشريط الجانبي', logout: 'تسجيل الخروج', loggingOut: 'جارٍ تسجيل الخروج...', unableToLogout: 'يتعذر تسجيل الخروج الآن.', primaryNavigation: 'التنقل الرئيسي' },
    home: { eyebrow: 'SweetTea MVP', title: 'طريقة أكثر دفئًا للعثور على أكشاك ومجموعات ودعم محلي موثوق.', description: 'يركز الإصدار الأول على الاكتشاف السريع: هيكل تطبيق واضح، فئات موجّهة، وفصل واضح بين الموارد الرسمية والمساحات المجتمعية.', exploreBooths: 'استكشفي الأكشاك', mockData: 'بيانات تجريبية جاهزة لتطوير الواجهة', doneTitle: 'معايير الإنجاز', doneItems: ['يعمل التطوير المحلي عبر Vite وهيكل تطبيق موجه بالمسارات.', 'يمكن تصفية الأكشاك حسب الفئة.', 'تظهر الأكشاك الرسمية والمجتمعية في أقسام منفصلة.', 'جميع المسارات المخططة موجودة حتى لو كانت بعض الصفحات تجريبية.'], highlights: [{ title: 'دعم رسمي', detail: 'أكشاك موثوقة للاحتياجات الأساسية والصحة والإرشاد.' }, { title: 'طاقة المجتمع', detail: 'مساحات يقودها الأقران وتتحدث بسرعة.' }, { title: 'اكتشاف سهل', detail: 'اعثري على المساحة المناسبة حسب الفئة قبل الانضمام إلى مجموعة.' }] },
    booths: { title: 'قائمة الأكشاك', subtitle: 'مكان تجتمع فيه المجموعات حسب الموضوع', loading: 'جارٍ تحميل بيانات الأكشاك...', empty: 'لا توجد أكشاك مطابقة لهذه الفئة بعد. جرّبي تبويبًا آخر.', officialSection: 'الأكشاك الرسمية', communitySection: 'أكشاك المجتمع', officialBadge: 'رسمي', see: 'عرض', groupCount: (count) => `${count} مجموعات`, categories: { All: 'الكل', Meals: 'الوجبات', 'School Life': 'الحياة المدرسية', 'Menstruation and Physical Condition': 'الحيض والحالة الجسدية', Work: 'العمل', Romance: 'العلاقات', hobby: 'الهوايات', 'Medical Care': 'الرعاية الطبية', Other: 'أخرى' } },
    groups: { title: 'المجموعات', subtitle: 'مساحة آمنة للمحادثات العميقة ضمن مجموعة صغيرة', createButton: 'أنشئي مجموعة جديدة', listTitle: 'المجموعات التي يمكنك الانضمام إليها', availability: 'الانضمام متاح', private: 'خاصة', members: (current, capacity) => `${current} / ${capacity} أشخاص`, modalTitle: 'أنشئي مجموعة جديدة', closeDialog: 'أغلقي نافذة إنشاء المجموعة', groupNameLabel: 'اسم المجموعة *', groupNamePlaceholder: 'مثال: غرفة دعم للعشرينات', selectBoothLabel: 'اختاري الكشك *', selectBoothPlaceholder: 'يرجى اختيار الكشك', descriptionLabel: 'الوصف', descriptionPlaceholder: 'اشرحي الغرض من هذه المجموعة.', maxPeopleLabel: 'الحد الأقصى لعدد الأشخاص', privateOnly: 'اجعلي المجموعة خاصة (بدعوة فقط)', submit: 'إنشاء المجموعة', errors: { requiredName: 'اسم المجموعة مطلوب.', chooseBooth: 'يرجى اختيار كشك قبل إنشاء المجموعة.', minCapacity: 'يجب ألا يقل الحد الأقصى عن شخصين.' } },
    guide: { title: 'مجموعة معارفك', subtitle: 'الحقائق الصغيرة التي تتعلمينها عند تسجيل الدخول تتراكم يومًا بعد يوم.', learnedCount: (count) => `تم جمع ${count} معلومة حتى الآن.`, announcementTitle: 'إعلانات مهمة', announcementText: 'المعلومات هنا عامة فقط. استشيري طبيبك قبل تغيير الدواء أو العلاج، واطلبي الرعاية الطبية فورًا في الحالات الطارئة.', emptyTitle: 'لا توجد معلومات بعد.', emptyText: 'سجّلي الدخول يوميًا لتظهر هنا معلومات جديدة.', hint: 'عودي غدًا وسجّلي أول معلومة لك.' },
    placeholders: { chat: { eyebrow: 'دردشة خاصة', title: 'يمكن إضافة المحادثات الخاصة بعد اكتمال تجربة الاكتشاف الأساسية.', description: 'المسار موجود الآن حتى تبقى الملاحة والتخطيط مستقرين عند إضافة المراسلة لاحقًا.' }, myTown: { eyebrow: 'مدينتي', title: 'هناك مسار مخصص لسياق المجتمع المحلي مع مساحة للتوسع.', description: 'يمكن استخدام هذه الصفحة لاحقًا لتحديثات الحي والموارد القريبة والتوصيات المبنية على المكان.' } },
    profile: { title: 'إعدادات الملف الشخصي', subtitle: 'استخدمي SweetTea بشكل مجهول وبراحة بال.', nicknameLabel: 'الاسم المستعار', nicknamePlaceholder: 'أدخلي اسمك المستعار المفضل.', nicknameHelp: 'سيشاهد الأعضاء الآخرون هذا الاسم.', ageGroupLabel: 'الفئة العمرية', ageGroupPlaceholder: 'اختاري الفئة العمرية.', languageSettings: 'إعدادات اللغة', selectedLanguage: (flag, label) => `اللغة المختارة: ${flag} ${label}`, avatarColor: 'لون الصورة الرمزية', selfIntroductionLabel: 'نبذة تعريفية (اختياري)', selfIntroductionPlaceholder: 'أخبرينا قليلًا عن نفسك.', preview: 'معاينة', ageGroupPending: 'الفئة العمرية غير محددة', saveProfile: 'حفظ الملف الشخصي', previewNameFallback: 'الاسم المستعار', ageGroups: { 'Under 18': 'أقل من 18', '18-22': '18-22', '23-29': '23-29', '30-39': '30-39', '40+': '40+' } },
    errorPage: { unexpectedRouteError: 'خطأ غير متوقع في المسار', pageNotFound: 'الصفحة غير موجودة', somethingWentWrong: 'حدث خطأ ما', notFoundMessage: 'الصفحة المطلوبة غير موجودة أو ربما تم نقلها.', genericMessage: 'تعذر تحميل الصفحة. حاولي الرجوع أو العودة إلى الصفحة الرئيسية.', goBack: 'رجوع', returnHome: 'العودة للرئيسية', helper: 'إذا استمرت المشكلة، فتحققي من إعدادات المسارات أو من صحة الرابط المطلوب.' },
    login: { badge: 'تسجيل دخول SweetTea', heroTitle: 'اعثري على مساحتك المجتمعية الموثوقة التالية.', heroDescription: 'سجّلي الدخول لحفظ الأكشاك المفضلة والانضمام إلى المجموعات المحلية والحفاظ على دليل مخصص لما يهمك.', featureCards: [{ title: 'الأكشاك المحفوظة', detail: 'احتفظي بالموارد الرسمية والمجتمعية في قائمة واحدة.' }, { title: 'المجموعات المحلية', detail: 'تابعي المحادثات ومساحات اللقاء بسهولة.' }, { title: 'دليل شخصي', detail: 'عودي بسرعة إلى مسارات الدعم التي تهمك أكثر.' }], welcomeBack: 'مرحبًا بعودتك', signInTitle: 'سجّلي الدخول إلى SweetTea', mvpPreview: 'معاينة MVP', email: 'البريد الإلكتروني', password: 'كلمة المرور', emailPlaceholder: 'you@example.com', passwordPlaceholder: 'أدخلي كلمة المرور', rememberMe: 'تذكرني', forgotPassword: 'هل نسيت كلمة المرور؟', signIn: 'تسجيل الدخول', signingIn: 'جارٍ تسجيل الدخول...', divider: 'أو تابعي باستخدام', signUpWithEmail: 'أنشئي حسابًا بالبريد الإلكتروني', continueWithGoogle: 'المتابعة بحساب Google', newHere: 'جديدة هنا؟', exploreApp: 'استكشفي التطبيق', showPassword: 'إظهار كلمة المرور', hidePassword: 'إخفاء كلمة المرور', missingCredentials: 'أدخلي البريد الإلكتروني وكلمة المرور لتسجيل الدخول.', unableToSignIn: 'يتعذر تسجيل الدخول الآن.' },
    register: { badge: 'تسجيل SweetTea', heroTitle: 'أنشئي حساب SweetTea الخاص بك.', heroDescription: 'سجّلي بالبريد الإلكتروني، عيّني كلمة المرور، وأضيفي بعض التفاصيل حتى يتمكن التطبيق من تخصيص الأكشاك والمجموعات والدليل لك.', featureCards: [{ title: 'وصول عبر البريد', detail: 'استخدمي بريدك الإلكتروني للتسجيل وإدارة حسابك.' }, { title: 'إعداد الملف الشخصي', detail: 'أضيفي الأساسيات الآن ليبدو لوح التحكم شخصيًا منذ البداية.' }, { title: 'اكتشاف محلي', detail: 'ساعدي SweetTea على إظهار المساحات المجتمعية وموارد الدعم القريبة.' }], createProfile: 'إنشاء الملف الشخصي', registerWithEmail: 'التسجيل بالبريد الإلكتروني', newAccount: 'حساب جديد', firstName: 'الاسم الأول', lastName: 'اسم العائلة', emailAddress: 'البريد الإلكتروني', sendValidationCode: 'إرسال رمز التحقق', sending: 'جارٍ الإرسال...', resendValidationCode: 'إعادة إرسال الرمز', emailVerified: 'تم التحقق من البريد', validationCode: 'رمز التحقق', validationCodePlaceholder: 'أدخلي الرمز المكون من 6 أرقام', verifyCode: 'تحقق من الرمز', verifyingCode: 'جارٍ التحقق...', password: 'كلمة المرور', confirmPassword: 'تأكيد كلمة المرور', createPasswordPlaceholder: 'أنشئي كلمة مرور', confirmPasswordPlaceholder: 'أعيدي كتابة كلمة المرور', username: 'اسم المستخدم', displayName: 'الاسم الظاهر', location: 'الموقع', nickname: 'الاسم المستعار', language: 'اللغة', profileFocus: 'هدف الملف الشخصي', ageGroup: 'الفئة العمرية', avatarColor: 'لون الصورة الرمزية', selfIntroduction: 'نبذة تعريفية', selfIntroductionPlaceholder: 'أحب مساعدة مجتمعي.', receiveUpdates: 'أرسلوا لي أحيانًا تحديثات عن الأكشاك الجديدة والأدلة وأنشطة المجتمع في منطقتي.', createAccount: 'إنشاء الحساب', creatingAccount: 'جارٍ إنشاء الحساب...', divider: 'أو', continueWithGoogle: 'المتابعة بحساب Google', alreadyRegistered: 'هل لديك حساب بالفعل؟', signInInstead: 'سجّلي الدخول بدلًا من ذلك', showPassword: 'إظهار كلمة المرور', hidePassword: 'إخفاء كلمة المرور', emailCodeSent: (email) => `تم إرسال رمز تحقق إلى ${email}. أدخلي الرمز المكون من 6 أرقام للمتابعة.`, emailVerifiedMessage: 'تم التحقق من البريد الإلكتروني. يمكنك إكمال إنشاء الحساب الآن.', errors: { invalidEmail: 'أدخلي بريدًا إلكترونيًا صالحًا قبل طلب الرمز.', unableToSendCode: 'يتعذر إرسال رمز التحقق الآن.', requestCodeFirst: 'اطلبي رمز التحقق أولًا.', invalidCode: 'أدخلي رمز تحقق صالحًا مكونًا من 6 أرقام.', unableToVerifyCode: 'يتعذر التحقق من الرمز الآن.', verifyEmailFirst: 'تحققي من بريدك الإلكتروني قبل إنشاء الحساب.', requiredIdentity: 'اسم المستخدم والاسم الأول واسم العائلة مطلوبة.', requiredPassword: 'أدخلي كلمة المرور وأكديها قبل إنشاء الحساب.', passwordMismatch: 'يجب أن تتطابق كلمة المرور مع تأكيدها.', unableToCreateAccount: 'يتعذر إنشاء الحساب الآن.' }, success: { accountCreated: 'تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول.' }, options: { profileFocus: ['أبحث عن موارد مجتمعية', 'أساعد في تنظيم مجموعات الدعم', 'أريد الموارد والمجموعات المحلية معًا'], ageGroups: [{ label: 'بالغة', value: 'adult' }, { label: 'مراهقة', value: 'teen' }, { label: 'كبيرة سنًا', value: 'senior' }], avatarColors: ['لافندر', 'مرجاني', 'سماوي', 'نعناعي', 'دوار الشمس'], languageOptions: ['الإنجليزية', 'الإسبانية', 'الصينية', 'الفيتنامية', 'أخرى'] } },
  },
}

const LANGUAGE_STORAGE_KEY = 'sweet-tea-language'
const DEFAULT_LANGUAGE: LanguageCode = 'en'

type LanguageContextValue = {
  language: LanguageCode
  setLanguage: (nextLanguage: LanguageCode) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function isSupportedLanguage(value: string | null): value is LanguageCode {
  return value !== null && supportedLanguages.includes(value as LanguageCode)
}

function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)

  if (isSupportedLanguage(storedLanguage)) {
    return storedLanguage
  }

  const browserLanguage = window.navigator.language.split('-')[0]

  if (isSupportedLanguage(browserLanguage)) {
    return browserLanguage
  }

  return DEFAULT_LANGUAGE
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}

export function useI18n() {
  const { language } = useLanguage()

  return translations[language]
}