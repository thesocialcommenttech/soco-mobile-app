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
  Addblog: { postType: Exclude<Post, SharedPost>['postType'] };
};

export type PortfolioStackScreenProps = BottomTabScreenProps<
  BottomTabStack,
  'PortfolioTab'
>;

export type PortfolioStack = {
  Bio: PortfolioTabScreenParam;
  Experiences: PortfolioTabScreenParam;
  Certifications: PortfolioTabScreenParam;
  Educations: PortfolioTabScreenParam;
  Skills: PortfolioTabScreenParam;
  Works: PortfolioTabScreenParam;
};

export type Portfolio_ScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<IPortfolioTabStack, 'Portfolio'>,
  PortfolioTab_ScreenProps
>;

export type PortfolioSubScreen_ScreenProps<T extends keyof IPortfolioTabStack> =
  CompositeScreenProps<
    NativeStackScreenProps<IPortfolioTabStack, T>,
    PortfolioTab_ScreenProps
  >;
