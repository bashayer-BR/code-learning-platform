import { db } from '../firebase';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
} from 'firebase/firestore';

// ── إنشاء مستخدم جديد ─────────────────────
export const createUserProfile = async (user) => {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid:              user.uid,
      name:             user.displayName || '',
      email:            user.email || '',
      avatar:           user.photoURL || '',
      createdAt:        new Date(),
      // التقدم
      completedLessons: [],
      completedChallenges: [],
      points:           0,
      streak:           0,
      lastActive:       new Date(),
      // Roadmap
      roadmapProgress: {},
    });
  }
};

// ── جلب بيانات المستخدم ───────────────────
export const getUserProfile = async (uid) => {
  const ref  = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

// ── إتمام درس ────────────────────────────
export const completeLesson = async (uid, lessonId) => {
  const ref = doc(db, 'users', uid);
  await updateDoc(ref, {
    completedLessons: arrayUnion(lessonId),
    points:           increment(10),
    lastActive:       new Date(),
  });
};

// ── إتمام تحدي ───────────────────────────
export const completeChallenge = async (uid, challengeId) => {
  const ref = doc(db, 'users', uid);
  await updateDoc(ref, {
    completedChallenges: arrayUnion(challengeId),
    points:              increment(20),
    lastActive:          new Date(),
  });
};

// ── تحديث تقدم الـ Roadmap ────────────────
export const updateRoadmapProgress = async (uid, roadmapId, itemTitle) => {
  const ref = doc(db, 'users', uid);
  await updateDoc(ref, {
    [`roadmapProgress.${roadmapId}`]: arrayUnion(itemTitle),
    points:                           increment(5),
  });
};