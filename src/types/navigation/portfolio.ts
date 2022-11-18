import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Post, SharedPost } from '~/src/utils/typings/post';
import {
  Experience,
  ICertification,
  IEducation,
  ISkill
} from '~/src/utils/typings/user-portfolio_interface/getPortforlioWorkData.interface';
import { User } from '~/src/utils/typings/user-profile_interface/getUserData.interface';
import { BottomTabStack, PortfolioTab_ScreenProps } from './bottomBar';

export interface PortfolioTabScreenParam {
  username: User['username'];
}

export type IPortfolioTabStack = {
  Portfolio: PortfolioTabScreenParam;
  Updatebio: undefined;
  Addexperience: { data: Experience };
  Addcertificate: { data: ICertification };
  Addskill: { data: ISkill };
  Addeducation: { data: IEducation };
  AddSocialAccounts: undefined;
  AddIntroVideo: undefined;
  Addblog: { postType: Exclude<Post, SharedPost>['postType'] };
  PortfolioTheme: { uri: string };
};

export type PortfolioStackScreenProps = BottomTabScreenProps<
  BottomTabStack,
  'PortfolioTab'
>;

export type PortfolioStack = {
  Bio: PortfolioTabScreenParam & { mine: boolean };
  Experiences: PortfolioTabScreenParam & { mine: boolean };
  Certifications: PortfolioTabScreenParam & { mine: boolean };
  Education: PortfolioTabScreenParam & { mine: boolean };
  Skills: PortfolioTabScreenParam & { mine: boolean };
  Works: PortfolioTabScreenParam & { mine: boolean };
};

export type Portfolio_ScreenProps = CompositeScreenProps<
  NativeStackScreenProps<IPortfolioTabStack, 'Portfolio'>,
  PortfolioTab_ScreenProps
>;

export type PortfolioSubScreen_ScreenProps<T extends keyof IPortfolioTabStack> =
  CompositeScreenProps<
    NativeStackScreenProps<IPortfolioTabStack, T>,
    PortfolioTab_ScreenProps
  >;

export type PortfolioSubTab_ScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<PortfolioStack>,
  Portfolio_ScreenProps
>;
