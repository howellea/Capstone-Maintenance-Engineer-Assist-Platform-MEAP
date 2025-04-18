
import { User, HistoricalReading, LiveReading, EquipmentProfile, EquipmentFault } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// ─── Argument Interfaces ────────────────────────────────────────────────

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
    role: 'engineer' | 'technician';
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface EquipmentIdArgs {
  equipmentId: string;
}

interface TimeRangeArgs extends EquipmentIdArgs {
  from: string;
  to: string;
}

interface FaultInputArgs {
  input: {
    equipmentId: string;
    faultType: string;
    severity: 'low' | 'medium' | 'high';
    notes?: string;
  };
}

interface ResolveFaultArgs {
  faultId: string;
}

// ─── Resolvers ──────────────────────────────────────────────────────────

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new AuthenticationError('Could not authenticate user.');
    },

    equipmentProfiles: async () => {
      return EquipmentProfile.find();
    },

    liveReadings: async (_parent: any, { equipmentId }: EquipmentIdArgs) => {
      const rawReadings = await LiveReading.find({ equipmentId })
        .sort({ timestamp: -1 })
        .limit(20);

      return rawReadings.map(reading => ({
        _id: reading._id,
        equipmentId: reading.equipmentId,
        timestamp: reading.timestamp,
        temperature: reading.tags?.temperature ?? null,
        flowRate: reading.tags?.flowRate ?? null,
        vibration: reading.tags?.vibration ?? null,
        motorStatus: reading.tags?.motorStatus ?? null,
      }));
    },

    historicalReadings: async (_parent: any, { equipmentId, from, to }: TimeRangeArgs) => {
      return HistoricalReading.find({
        equipmentId,
        timestamp: {
          $gte: new Date(from),
          $lte: new Date(to),
        },
      }).sort({ timestamp: 1 });
    },

    equipmentFaults: async (_parent: any, { equipmentId }: EquipmentIdArgs) => {
      return EquipmentFault.find({ equipmentId }).sort({ timestamp: -1 });
    },
  },

  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id, user.role);
      return { token, user };
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('Could not authenticate user.');

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError('Could not authenticate user.');

      const token = signToken(user.username, user.email, user._id, user.role);
      return { token, user };
    },

    addEquipmentFault: async (_parent: any, { input }: FaultInputArgs, context: any) => {
      if (!context.user) throw new AuthenticationError('Unauthorized');
      const fault = await EquipmentFault.create({
        ...input,
        timestamp: new Date(),
        resolved: false,
      });
      return fault;
    },

    resolveFault: async (_parent: any, { faultId }: ResolveFaultArgs, context: any) => {
      if (!context.user) throw new AuthenticationError('Unauthorized');
      return EquipmentFault.findByIdAndUpdate(
        faultId,
        { resolved: true },
        { new: true }
      );
    },
  },
};

export default resolvers;
