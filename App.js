import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, TextInput, Image, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// ========== 配色 ==========
const C = {
  green: '#4CAF50',
  greenLight: '#E8F5E9',
  orange: '#FF7043',
  blue: '#42A5F5',
  blueLight: '#E3F2FD',
  purple: '#7E57C2',
  purpleLight: '#EDE7F6',
  pink: '#EC407A',
  pinkLight: '#FCE4EC',
  gold: '#FFB300',
  bg: '#F5F6FA',
  card: '#FFFFFF',
  text: '#333333',
  textLight: '#999999',
  white: '#FFFFFF',
};

// ========== 页面 ==========
const SCREENS = {
  HOME: 'home',
  AI: 'ai',
  HOSPITAL: 'hospital',
  PROFILE: 'profile',
};

// ========== 主组件 ==========
export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');

  const askAI = () => {
    if (!aiQuestion.trim()) return;
    const answers = [
      '狗狗偶尔打喷嚏是正常的，但如果频繁打喷嚏并伴有鼻涕，可能是感冒或过敏。建议观察24小时，如果症状加重请及时就医。',
      '猫咪每天睡12-16个小时是正常的，这是它们的天性。只要食欲和精神状态正常，不用担心。',
      '建议每月做一次体外驱虫，每3个月做一次体内驱虫。定期驱虫对宠物健康非常重要。',
      '宠物每年应该做一次全面体检，包括血常规、生化、B超等。7岁以上的老年宠物建议每半年一次。',
    ];
    setAiAnswer(answers[Math.floor(Math.random() * answers.length)]);
  };

  return (
    <SafeAreaView style={s.container}>
      {/* 顶部状态栏 */}
      <View style={s.header}>
        <Text style={s.headerTitle}>宠安·阿福</Text>
        <Text style={s.headerSub}>AI宠物健康管家</Text>
      </View>

      {/* 页面内容 */}
      {screen === SCREENS.HOME && <HomeScreen onNavigate={setScreen} />}
      {screen === SCREENS.AI && (
        <AIScreen
          question={aiQuestion}
          setQuestion={setAiQuestion}
          answer={aiAnswer}
          onAsk={askAI}
          onBack={() => setScreen(SCREENS.HOME)}
        />
      )}
      {screen === SCREENS.HOSPITAL && <HospitalScreen onBack={() => setScreen(SCREENS.HOME)} />}
      {screen === SCREENS.PROFILE && <ProfileScreen onBack={() => setScreen(SCREENS.HOME)} />}

      {/* 底部导航 */}
      <View style={s.tabBar}>
        <TabBtn icon="🏠" label="首页" active={screen === SCREENS.HOME} onPress={() => setScreen(SCREENS.HOME)} />
        <TabBtn icon="🤖" label="AI问诊" active={screen === SCREENS.AI} onPress={() => setScreen(SCREENS.AI)} />
        <TabBtn icon="🏥" label="找医院" active={screen === SCREENS.HOSPITAL} onPress={() => setScreen(SCREENS.HOSPITAL)} />
        <TabBtn icon="📋" label="档案" active={screen === SCREENS.PROFILE} onPress={() => setScreen(SCREENS.PROFILE)} />
      </View>
    </SafeAreaView>
  );
}

// ========== 底部导航按钮 ==========
function TabBtn({ icon, label, active, onPress }) {
  return (
    <TouchableOpacity style={s.tabBtn} onPress={onPress}>
      <Text style={[s.tabIcon, active && s.tabActive]}>{icon}</Text>
      <Text style={[s.tabLabel, active && s.tabActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ========== 首页 ==========
function HomeScreen({ onNavigate }) {
  return (
    <ScrollView style={s.body} showsVerticalScrollIndicator={false}>
      {/* 宠物卡片 */}
      <View style={s.petCard}>
        <View style={s.petAvatar}>
          <Text style={s.petAvatarText}>🐱</Text>
        </View>
        <View style={s.petInfo}>
          <Text style={s.petName}>豆包</Text>
          <Text style={s.petBreed}>英短 · 3岁 · ♂</Text>
          <View style={s.healthTag}>
            <Text style={s.healthTagText}>健康评分 92</Text>
          </View>
        </View>
      </View>

      {/* 快捷数据 */}
      <View style={s.statsRow}>
        <StatCard icon="⚖️" value="4.8kg" label="体重" />
        <StatCard icon="🌡️" value="38.2°" label="体温" />
        <StatCard icon="❤️" value="120" label="心率" />
        <StatCard icon="🏃" value="8,230" label="今日步数" />
      </View>

      {/* 功能菜单 */}
      <Text style={s.sectionTitle}>常用功能</Text>
      <View style={s.menuGrid}>
        <MenuCard icon="🤖" label="AI问诊" color={C.blue} bg={C.blueLight} onPress={() => onNavigate('ai')} />
        <MenuCard icon="🏥" label="附近医院" color={C.green} bg={C.greenLight} onPress={() => onNavigate('hospital')} />
        <MenuCard icon="💊" label="在线药房" color={C.orange} bg={C.pinkLight} onPress={() => {}} />
        <MenuCard icon="📅" label="疫苗提醒" color={C.purple} bg={C.purpleLight} onPress={() => {}} />
        <MenuCard icon="🍽️" label="饮食建议" color={C.green} bg={C.greenLight} onPress={() => {}} />
        <MenuCard icon="📋" label="健康档案" color={C.blue} bg={C.blueLight} onPress={() => onNavigate('profile')} />
      </View>

      {/* 健康贴士 */}
      <Text style={s.sectionTitle}>每日健康贴士</Text>
      <View style={s.tipCard}>
        <Text style={s.tipEmoji}>💡</Text>
        <View style={s.tipContent}>
          <Text style={s.tipTitle}>夏季宠物防暑指南</Text>
          <Text style={s.tipText}>避免正午遛狗，备足饮水，不要将宠物单独留在车内。短鼻犬种（法斗、巴哥）尤其需要注意防暑降温。</Text>
        </View>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <View style={s.statCard}>
      <Text style={s.statIcon}>{icon}</Text>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

function MenuCard({ icon, label, color, bg, onPress }) {
  return (
    <TouchableOpacity style={[s.menuCard, { backgroundColor: bg }]} onPress={onPress}>
      <Text style={s.menuIcon}>{icon}</Text>
      <Text style={[s.menuLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ========== AI问诊页 ==========
function AIScreen({ question, setQuestion, answer, onAsk, onBack }) {
  return (
    <View style={s.body}>
      <TouchableOpacity onPress={onBack} style={s.backBtn}>
        <Text style={s.backText}>← 返回</Text>
      </TouchableOpacity>

      <Text style={s.pageTitle}>🤖 AI宠物医生</Text>
      <Text style={s.pageSub}>描述宠物症状，AI帮你初步分析</Text>

      <View style={s.aiCard}>
        <TextInput
          style={s.aiInput}
          placeholder="例如：我家猫这两天不怎么吃东西，还总是打喷嚏..."
          placeholderTextColor="#BBB"
          multiline
          value={question}
          onChangeText={setQuestion}
        />
        <TouchableOpacity style={s.aiBtn} onPress={onAsk}>
          <Text style={s.aiBtnText}>开始问诊</Text>
        </TouchableOpacity>
      </View>

      {answer ? (
        <View style={s.aiAnswer}>
          <Text style={s.aiAnswerIcon}>🩺</Text>
          <Text style={s.aiAnswerText}>{answer}</Text>
          <Text style={s.aiDisclaimer}>⚠️ AI分析仅供参考，紧急情况请立即就医</Text>
        </View>
      ) : null}
    </View>
  );
}

// ========== 找医院页 ==========
function HospitalScreen({ onBack }) {
  const hospitals = [
    { name: '宠爱国际动物医院', addr: '朝阳区望京街道', dist: '1.2km', rating: '4.8' },
    { name: '瑞鹏宠物医院', addr: '海淀区中关村', dist: '2.5km', rating: '4.6' },
    { name: '芭比堂动物医院', addr: '西城区金融街', dist: '3.1km', rating: '4.7' },
  ];

  return (
    <ScrollView style={s.body}>
      <TouchableOpacity onPress={onBack} style={s.backBtn}>
        <Text style={s.backText}>← 返回</Text>
      </TouchableOpacity>

      <Text style={s.pageTitle}>🏥 附近宠物医院</Text>
      <Text style={s.pageSub}>北京 · 已接入28家直赔医院</Text>

      {hospitals.map((h, i) => (
        <View key={i} style={s.hospitalCard}>
          <View style={s.hospitalLeft}>
            <Text style={s.hospitalName}>{h.name}</Text>
            <Text style={s.hospitalAddr}>{h.addr}</Text>
            <Text style={s.hospitalDist}>📍 {h.dist}</Text>
          </View>
          <View style={s.hospitalRight}>
            <Text style={s.hospitalRating}>⭐ {h.rating}</Text>
            <TouchableOpacity style={s.callBtn}>
              <Text style={s.callBtnText}>导航</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// ========== 健康档案页 ==========
function ProfileScreen({ onBack }) {
  const records = [
    { date: '2026-06-15', title: '年度体检', desc: '全部指标正常，体重略增', tag: '正常' },
    { date: '2026-04-02', title: '狂犬疫苗', desc: '第三针，有效期至2027年', tag: '已完成' },
    { date: '2025-12-10', title: '体外驱虫', desc: '福来恩滴剂', tag: '已完成' },
  ];

  return (
    <ScrollView style={s.body}>
      <TouchableOpacity onPress={onBack} style={s.backBtn}>
        <Text style={s.backText}>← 返回</Text>
      </TouchableOpacity>

      <Text style={s.pageTitle}>📋 健康档案</Text>

      {/* 宠物信息 */}
      <View style={s.profileCard}>
        <Text style={s.profileName}>豆包</Text>
        <View style={s.profileRow}>
          <ProfileItem label="品种" value="英短" />
          <ProfileItem label="年龄" value="3岁" />
          <ProfileItem label="性别" value="公 ♂" />
        </View>
        <View style={s.profileRow}>
          <ProfileItem label="体重" value="4.8kg" />
          <ProfileItem label="血型" value="A型" />
          <ProfileItem label="芯片" value="已植入" />
        </View>
      </View>

      {/* 医疗记录 */}
      <Text style={s.sectionTitle}>医疗记录</Text>
      {records.map((r, i) => (
        <View key={i} style={s.recordCard}>
          <View style={s.recordDot} />
          <View style={s.recordContent}>
            <View style={s.recordHeader}>
              <Text style={s.recordTitle}>{r.title}</Text>
              <Text style={s.recordDate}>{r.date}</Text>
            </View>
            <Text style={s.recordDesc}>{r.desc}</Text>
          </View>
          <View style={[s.recordTag, r.tag === '正常' ? s.tagGreen : s.tagBlue]}>
            <Text style={s.recordTagText}>{r.tag}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function ProfileItem({ label, value }) {
  return (
    <View style={s.profileItem}>
      <Text style={s.profileItemLabel}>{label}</Text>
      <Text style={s.profileItemValue}>{value}</Text>
    </View>
  );
}

// ========== 样式 ==========
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { backgroundColor: C.green, paddingVertical: 16, paddingHorizontal: 20, paddingTop: 10 },
  headerTitle: { color: C.white, fontSize: 22, fontWeight: 'bold' },
  headerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },

  body: { flex: 1, paddingHorizontal: 16 },

  // 宠物卡片
  petCard: { backgroundColor: C.card, borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4 },
  petAvatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: C.greenLight, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  petAvatarText: { fontSize: 40 },
  petInfo: { flex: 1 },
  petName: { fontSize: 22, fontWeight: 'bold', color: C.text },
  petBreed: { fontSize: 14, color: C.textLight, marginTop: 2, marginBottom: 8 },
  healthTag: { backgroundColor: C.greenLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start' },
  healthTagText: { color: C.green, fontSize: 13, fontWeight: '600' },

  // 快捷数据
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { backgroundColor: C.card, borderRadius: 12, padding: 12, alignItems: 'center', width: (width - 48) / 4, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 14, fontWeight: 'bold', color: C.text },
  statLabel: { fontSize: 11, color: C.textLight, marginTop: 2 },

  // 功能菜单
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: C.text, marginBottom: 12, marginTop: 4 },
  menuGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 8 },
  menuCard: { width: (width - 48) / 2, borderRadius: 14, padding: 20, alignItems: 'center', marginBottom: 12 },
  menuIcon: { fontSize: 32, marginBottom: 8 },
  menuLabel: { fontSize: 15, fontWeight: '600' },

  // 健康贴士
  tipCard: { backgroundColor: C.card, borderRadius: 14, padding: 16, flexDirection: 'row', marginBottom: 16, elevation: 1 },
  tipEmoji: { fontSize: 28, marginRight: 12, marginTop: 2 },
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 15, fontWeight: 'bold', color: C.text, marginBottom: 4 },
  tipText: { fontSize: 13, color: C.textLight, lineHeight: 20 },

  // 底部导航
  tabBar: { flexDirection: 'row', backgroundColor: C.card, borderTopWidth: 1, borderTopColor: '#EEE', paddingVertical: 8 },
  tabBtn: { flex: 1, alignItems: 'center', paddingVertical: 4 },
  tabIcon: { fontSize: 20, marginBottom: 2 },
  tabLabel: { fontSize: 11, color: C.textLight },
  tabActive: { opacity: 1 },

  // 通用
  backBtn: { marginTop: 12, marginBottom: 8 },
  backText: { fontSize: 15, color: C.green, fontWeight: '600' },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: C.text, marginBottom: 4 },
  pageSub: { fontSize: 14, color: C.textLight, marginBottom: 20 },

  // AI问诊
  aiCard: { backgroundColor: C.card, borderRadius: 14, padding: 16, marginBottom: 16 },
  aiInput: { backgroundColor: C.bg, borderRadius: 10, padding: 14, fontSize: 15, color: C.text, minHeight: 100, textAlignVertical: 'top', marginBottom: 12 },
  aiBtn: { backgroundColor: C.blue, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  aiBtnText: { color: C.white, fontSize: 16, fontWeight: 'bold' },
  aiAnswer: { backgroundColor: C.blueLight, borderRadius: 14, padding: 16 },
  aiAnswerIcon: { fontSize: 24, marginBottom: 8 },
  aiAnswerText: { fontSize: 14, color: C.text, lineHeight: 22 },
  aiDisclaimer: { fontSize: 11, color: C.textLight, marginTop: 10, fontStyle: 'italic' },

  // 医院
  hospitalCard: { backgroundColor: C.card, borderRadius: 14, padding: 16, flexDirection: 'row', marginBottom: 10, elevation: 1 },
  hospitalLeft: { flex: 1 },
  hospitalName: { fontSize: 16, fontWeight: 'bold', color: C.text },
  hospitalAddr: { fontSize: 13, color: C.textLight, marginTop: 4 },
  hospitalDist: { fontSize: 12, color: C.blue, marginTop: 4 },
  hospitalRight: { alignItems: 'flex-end', justifyContent: 'center' },
  hospitalRating: { fontSize: 14, color: C.gold, fontWeight: '600', marginBottom: 8 },
  callBtn: { backgroundColor: C.green, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 8 },
  callBtnText: { color: C.white, fontSize: 13, fontWeight: '600' },

  // 档案
  profileCard: { backgroundColor: C.card, borderRadius: 14, padding: 20, marginBottom: 20, elevation: 1 },
  profileName: { fontSize: 20, fontWeight: 'bold', color: C.text, marginBottom: 14 },
  profileRow: { flexDirection: 'row', marginBottom: 10 },
  profileItem: { flex: 1 },
  profileItemLabel: { fontSize: 12, color: C.textLight },
  profileItemValue: { fontSize: 15, fontWeight: '600', color: C.text, marginTop: 2 },
  recordCard: { backgroundColor: C.card, borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, elevation: 1 },
  recordDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.green, marginTop: 4, marginRight: 12 },
  recordContent: { flex: 1 },
  recordHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  recordTitle: { fontSize: 15, fontWeight: '600', color: C.text },
  recordDate: { fontSize: 12, color: C.textLight },
  recordDesc: { fontSize: 13, color: C.textLight },
  recordTag: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, marginLeft: 8 },
  tagGreen: { backgroundColor: C.greenLight },
  tagBlue: { backgroundColor: C.blueLight },
  recordTagText: { fontSize: 11, fontWeight: '600' },
});